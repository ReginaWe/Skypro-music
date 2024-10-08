"use client";
import { TrackType } from "@/app/types/tracks";
import styles from "./PlaylistItem.module.css";
import classNames from "classnames";
import { printTime } from "../../../utils/datetime";
import { useCurrentTrack } from "@/contexts/CurrentTrackProvider";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setCurrentTrack } from "@/store/features/playlistSlice";
import useLikeTrack from "@/hooks/useLikeTrack";

type TrackProps = {
  track: TrackType;
  tracks: TrackType[];
};

export function PlaylistItem({ track, tracks }: TrackProps) {
  const { currentTrack, isPlaying } = useAppSelector((state) => state.playlist);
  /* const { setCurrentTrack } = useCurrentTrack(); */
  const { name, author, album, duration_in_seconds, _id } = track; /* 
  const isPlaying = currentTrack ? currentTrack._id === _id : false; */
  const dispatch = useAppDispatch();
  const { isLiked, handleLike } = useLikeTrack(track);

  const handleTrackClick = () => {
    dispatch(setCurrentTrack({ track, tracks }));
  };
  return (
    <div onClick={handleTrackClick} className={styles.playlistItem}>
      <div className={styles.playlistTrack}>
        <div className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            {currentTrack?._id === _id ? (
              <svg
                className={classNames(styles.playingTrack, {
                  [styles.active]: isPlaying,
                })}
              >
                <use xlinkHref="img/icon/sprite.svg#icon-playingTrack"></use>
              </svg>
            ) : (
              <svg className={styles.trackTitleSvg}>
                <use xlinkHref="img/icon/sprite.svg#icon-note" />
              </svg>
            )}
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
        <div onClick={handleLike} className="track__time">
            <svg className={classNames(styles.trackTimeSvg, {[styles.active]: isLiked})}>
              <use xlinkHref="img/icon/sprite.svg#icon-like" />
            </svg>
          <span className={styles.trackTimeText}>
            {printTime(duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PlaylistItem;
