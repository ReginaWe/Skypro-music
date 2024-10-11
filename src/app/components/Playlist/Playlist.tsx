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
        {filteredTracks.map((track: TrackType) => (
          <PlaylistItem key={track._id} track={track} tracks={filteredTracks} />
        ))}
      </div>
    </div>
  );
}

function Fn1() {} // function declaration
const Fn2 = function () {} // function expression
const Fn3 = () => {} // arrow function

function Fn14() { return 0 }
const Fn24 = function () { return 0 }
const Fn34 = () => { return 0 }
const Fn35 = () => 0
const Fn36 = () => { return (0) }
const Fn37 = () => (
  0
)

const Fn38 = () => (
  console.log("object")
)

const obj = {
  fn2: function () {},
  fn3: () => {},
  fn4() {},
}
