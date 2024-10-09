import { TrackType } from "@/app/types/tracks";
import PlaylistItem from "../PlaylistItem/PlaylistItem";
import styles from "./Playlist.module.css";
import classNames from "classnames";
import { useAppSelector } from "@/hooks/hooks";

type PlaylistProps = {
  tracks: TrackType[];
};

export default function Playlist({ tracks }: PlaylistProps) {
  const filteredTracks = useAppSelector(
    (state) => state.playlist.filteredTracks
  );
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
      <div className={styles.contentPlaylist}>
        {/* {tracks.map((track) => (
          <PlaylistItem key={track._id} track={track} tracks={tracks} />
        ))} */}
        {filteredTracks.map((track) => {
          <PlaylistItem key={track._id} track={track} tracks={tracks} />;
        })}
      </div>
    </div>
  );
}
