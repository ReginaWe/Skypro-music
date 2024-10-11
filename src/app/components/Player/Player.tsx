"use client";
import Volume from "../Volume/Volume";
import styles from "./Player.module.css";
import classNames from "classnames";
import { TrackPlay } from "../TrackPlay/TrackPlay";
import { useEffect, useRef, useState } from "react";
import ProgressBar from "./ProgressBar/ProgressBar";
import { printTime } from "@/utils/datetime";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  setIsPlaying,
  setIsShuffle,
  setNextTrack,
  setPrevTrack,
} from "@/store/features/playlistSlice";

const Player = () => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isLoop, setIsLoop] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { currentTrack, isPlaying, isShuffle } = useAppSelector(
    (state) => state.playlist
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!audioRef || !audioRef.current) {
      return;
    }
    const handleGoNext = () => {
      if (!isLoop) {
        handleNextTrack()
      }
    }
    
    const audio = audioRef.current;
    audio.addEventListener("ended", handleGoNext);

    return () => {
      audio.removeEventListener("ended", handleGoNext);
    };
  }, [audioRef.current]);

  const handleNextTrack = () => {
    dispatch(setNextTrack());
  };
  const handlePrevTrack = () => {
    dispatch(setPrevTrack());
  };
  const handleIsShuffle = () => {
    dispatch(setIsShuffle(""));
  };

  useEffect(() => {
    const currentAudio = audioRef.current;
    if (!currentTrack || !currentAudio) {
      return;
    }
    dispatch(setIsPlaying(true));
    setCurrentTime(0);
    currentAudio.currentTime = 0;
    currentAudio.play();
  }, [currentTrack]);

  if (!currentTrack) {
    return null;
  }
  const { name, author, track_file, _id } = currentTrack;

  const duration = audioRef.current?.duration || 0;

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
    }
  };
  //Функция воспроизведения и паузы трека
  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    }
    dispatch(setIsPlaying(""));
  };
  //Функция зацикливания трека
  const repeatTrack = () => {
    setIsLoop(!isLoop);
    audioRef.current!.loop = !isLoop;
  };

  function updateTime(e: React.ChangeEvent<HTMLAudioElement>) {
    setCurrentTime(e.currentTarget.currentTime);
  }

  return (
    <div className={styles.bar}>
      <div className={styles.barContent}>
        <audio
          className={styles.audio}
          ref={audioRef}
          controls
          src={track_file}
          onTimeUpdate={updateTime}
        ></audio>
        <ProgressBar
          max={duration}
          value={currentTime}
          step={0.01}
          onChange={handleSeek}
        />
        <div className={styles.barPlayerBlock}>
          <div className={styles.barPlayer}>
            <div className={styles.playerControls}>
              <div onClick={handlePrevTrack} className={styles.playerBtnPrev}>
                <svg className={styles.playerBtnPrevSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-prev" />
                </svg>
              </div>
              <div
                onClick={togglePlay}
                className={classNames(styles.playerBtnPlay, styles._btn)}
              >
                {isPlaying ? (
                  <svg className={styles.playerBtnPlaySvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-pause" />
                  </svg>
                ) : (
                  <svg className={styles.playerBtnPlaySvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-play" />
                  </svg>
                )}
              </div>
              <div onClick={handleNextTrack} className={styles.playerBtnNext}>
                <svg className={styles.playerBtnNextSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-next" />
                </svg>
              </div>
              <div
                className={classNames(styles.playerBtnRepeat, styles._btnIcon, {
                  [styles.active]: isLoop,
                })}
                onClick={repeatTrack}
              >
                <svg className={classNames(styles.playerBtnRepeatSvg)}>
                  <use xlinkHref="img/icon/sprite.svg#icon-repeat" />
                </svg>
              </div>
              <div
                onClick={handleIsShuffle}
                className={classNames(
                  styles.playerBtnShuffle,
                  styles._btnIcon,
                  {
                    [styles.active]: isShuffle,
                  }
                )}
              >
                <svg className={styles.playerBtnShuffleSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-shuffle" />
                </svg>
              </div>
            </div>
            <TrackPlay track={currentTrack}/>
          </div>
          <Volume audioRef={audioRef} />
          <span className={styles.barTimers}>
            {audioRef.current &&
              !isNaN(audioRef.current.duration) &&
              `${printTime(audioRef.current.currentTime)} / ${printTime(
                audioRef.current.duration
              )}`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Player;
