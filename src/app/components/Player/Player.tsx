"use client";
import { useCurrentTrack } from "@/contexts/CurrentTrackProvider";
import Volume from "../Volume/Volume";
import styles from "./Player.module.css";
import classNames from "classnames";
import { TrackPlay } from "../TrackPlay/TrackPlay";
import { useRef, useState } from "react";
import ProgressBar from "./ProgressBar/ProgressBar";

const Player = () => {
  const { currentTrack } = useCurrentTrack();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
  return (
    <div className={styles.bar}>
      <div className={styles.barContent}>
        <audio
          className={styles.audio}
          ref={audioRef}
          controls
          src={track_file}
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
                <svg className={styles.playerBtnPlaySvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-pause" />
                </svg>
                {/* {isPlaying ? (
                  <svg>
                    <use xlinkHref="img/icon/sprite.svg#icon-pause" />
                  </svg>
                ) : (
                  <svg className={styles.playerBtnPlaySvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-play" />
                  </svg>
                )} */}
              </div>
              <div className={styles.playerBtnNext}>
                <svg className={styles.playerBtnNextSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-next" />
                </svg>
              </div>
              <div
                className={classNames(styles.playerBtnRepeat, styles._btnIcon)}
              >
                <svg className={styles.playerBtnRepeatSvg}>
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
          <Volume />
        </div>
      </div>
    </div>
  );
};

export default Player;
