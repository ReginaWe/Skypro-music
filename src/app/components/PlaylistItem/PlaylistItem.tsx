import { TrackType } from "@/app/types/tracks";
import styles from "./PlaylistItem.module.css";

type TrackProps = {
  track: TrackType;
};

export function PlaylistItem({ track }: TrackProps) {
  const { name, author, album } = track;
  return (
    <div className={styles.contentPlaylist}>
      <div className={styles.playlistItem}>
        <div className={styles.playlistTrack}>
          <div className={styles.trackTitle}>
            <div className={styles.trackTitleImage}>
              <svg className={styles.trackTitleSvg}>
                <use xlinkHref="img/icon/sprite.svg#icon-note" />
              </svg>
            </div>
            <div className="track__title-text">
              <span className={styles.trackTitleLinkspan}>
                {name} <span className={styles.trackTitleSpan} />
              </span>
            </div>
          </div>
          <div className={styles.trackAuthor}>
            <span className={styles.trackAuthorLink}>{author}</span>
          </div>
          <div className={styles.trackAlbum}>
            <span className={styles.trackAlbumLink}>{album}</span>
          </div>
          <div className="track__time">
            <svg className={styles.trackTimeSvg}>
              <use xlinkHref="img/icon/sprite.svg#icon-like" />
            </svg>
            <span className={styles.trackTimeText}>4:44</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaylistItem;
