import useLikeTrack from "@/hooks/useLikeTrack";
import styles from "./TrackPlay.module.css";
import classNames from "classnames";
import { TrackType } from "@/app/types/tracks";

type TrackPlayProps = {
  track: TrackType;
};

export function TrackPlay({ track }: TrackPlayProps) {
  const { isLiked, handleLike } = useLikeTrack(track);
  const { name, author, _id } = track

  return (
    <div className={styles.playerTrackPlay}>
      <div className={styles.trackPlayContain}>
        <div className={styles.trackPlayImage}>
          <svg className={styles.trackPlaySvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-note" />
          </svg>
        </div>
        <div className={styles.trackPlayAuthor}>
          <a className={styles.trackPlayAuthorLink} href="http://">
            {name}
          </a>
        </div>
        <div className={styles.trackPlayAlbum}>
          <a className={styles.trackPlayAlbumLink} href="http://">
            {author}
          </a>
        </div>
      </div>
      <div className={styles.trackPlayLikeDis}>
        <div className={classNames(styles.trackPlayLike, styles._btnIcon)} onClick={handleLike}>
          <svg className={classNames(styles.trackPlayLikeSvg, {[styles.active]: isLiked})}>
            <use xlinkHref="img/icon/sprite.svg#icon-like" />
          </svg>
        </div>
        {/* <div className={classNames(styles.trackPlayDislike, styles._btnIcon)}>
          <svg className={styles.trackPlayDislikeSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-dislike" />
          </svg>
        </div> */}
      </div>
    </div>
  );
}
