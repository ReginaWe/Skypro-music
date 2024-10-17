"use client";
import { TrackType } from "@/app/types/tracks";
import PlaylistItem from "../PlaylistItem/PlaylistItem";
import styles from "./Playlist.module.css";
import classNames from "classnames";
import { useAppSelector } from "@/hooks/hooks";

type PlaylistProps = {
  tracks: TrackType[];
};

export default function Playlist({ tracks }: PlaylistProps) {
  /*  const filteredTracks = useAppSelector(
    (state) => state.player.filteredTracks
  ); */
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
            <use xlinkHref="/img/icon/sprite.svg#icon-watch" />
          </svg>
        </div>
      </div>
      <div className={styles.contentPlaylist}>
        {/* {tracks.map((track) => (
          <PlaylistItem key={track._id} track={track} tracks={tracks} />
        ))} */}
        {tracks.map((track: TrackType) => (
          <PlaylistItem key={track._id} track={track} tracks={tracks} />
        ))}
      </div>
    </div>
  );
}

/* function Fn1() {} // => undefined // function declaration
const Fn2 = function () {} // => undefined // function expression
const Fn3 = () => {} // => undefined // arrow function

function Fn14() { return 0 }
const Fn24 = function () { return 0 }
const Fn34 = () => { return 0 }
const Fn35 = () => 0
const Fn36 = () => { return (0) }
const Fn37 = () => (
  0
)

const Fn38 = () => (
  console.log("object") // => undefined
)

const obj = {
  fn2: function () {}, // => undefined
  fn3: () => {}, // => undefined
  fn4() {}, // => undefined
}

// classes

class Tst {
  x: number = 0

  constructor(_x: number = 0) {
    this.x = 1
  }

  fn4() {} // => undefined
}

const tst1 = new Tst()
const tst2 = new Tst(5)
tst2.fn4() */
