import { TrackType } from "@/app/types/tracks";
import PlaylistItem from "../PlaylistItem/PlaylistItem";
import styles from "./Playlist.module.css";
import classNames from "classnames";

type PlaylistProps = {
  tracks: TrackType[];
};

export function Playlist({ tracks }: PlaylistProps) {
  return (
    <div className={styles.centerblockContent}>
      <div className={styles.contentTitle}>
        <div className={classNames(styles.playlistTitleCol, styles.col01)}>
          Трек
        </div>
        <div className={classNames(styles.playlistTitleCol, styles.col02)}>
          Исполнитель
        </div>
        <div className={classNames(styles.playlistTitleCol, styles.col03)}>
          Альбом
        </div>
        <div className={classNames(styles.playlistTitleCol, styles.col04)}>
          <svg className={styles.playlistTitleSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-watch" />
          </svg>
        </div>
      </div>
      {tracks.map((track) => (
        <PlaylistItem key={track.id} track={track} />
      ))}
    </div>
  );
}
