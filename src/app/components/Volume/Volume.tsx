import React, { RefObject, useEffect, useState } from "react";
import styles from "./Volume.module.css";
import classNames from "classnames";
type VolumeProps = {
  audioRef: RefObject<HTMLAudioElement>;
};

const Volume = React.memo(({ audioRef }: VolumeProps) => {
  const [volume, setVolume] = useState<number>(0.5); // Начальная громкость установлена на 50%

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume, audioRef]);

  return (
    <div className={styles.barVolumeBlock}>
      <div className={styles.volumeContent}>
        <div className={styles.volumeImage}>
          <svg className={styles.volumeSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-volume" />
          </svg>
        </div>
        <div className={classNames(styles.volumeProgress, styles._btn)}>
          <input
            className={classNames(styles.volumeProgressLine, styles._btn)}
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
});
Volume.displayName = "Volume";
export default Volume;
