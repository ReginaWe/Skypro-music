"use client";
import { useCurrentTrack } from "@/contexts/CurrentTrackProvider";
import Volume from "../Volume/Volume";
import styles from "./Player.module.css";
import classNames from "classnames";
import { TrackPlay } from "../TrackPlay/TrackPlay";
import { useEffect, useRef, useState } from "react";
import ProgressBar from "./ProgressBar/ProgressBar";
import { printTime } from "@/utils/datetime";

const Player = () => {
  const { currentTrack } = useCurrentTrack();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isLoop, setIsLoop] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const currentAudio = audioRef.current
    if (!currentTrack || !currentAudio) {
      return;
    }
    setIsPlaying(true);
    setCurrentTime(0);
    currentAudio.currentTime = 0;
    currentAudio.play();
  }, [currentTrack]);

  if (!currentTrack) {
    return null;
  }
  const { name, author, track_file } = currentTrack;

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
    setIsPlaying((prev) => !prev);
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
              <div className={styles.playerBtnPrev}>
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
              <div className={styles.playerBtnNext}>
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
                className={classNames(styles.playerBtnShuffle, styles._btnIcon)}
              >
                <svg className={styles.playerBtnShuffleSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-shuffle" />
                </svg>
              </div>
            </div>
            <TrackPlay name={name} author={author} />
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
