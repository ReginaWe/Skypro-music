import { getTracks } from "@/app/api/tracks";
import Filter from "../Filter/Filter";
import styles from "./CenterBlock.module.css";
import { TrackType } from "@/app/types/tracks";
import { Playlist } from "../Playlist/Playlist";

export async function CenterBlock() {
  let tracks: TrackType[] = [];
  let error: string = "";
  try {
    tracks = await getTracks();
  } catch (err: unknown) {
    error =
      err instanceof Error
        ? "Ошибка при загрузке треков " + err.message
        : "Неизвестная ошибка";
  }

  return (
    <div className={styles.mainCenterblock}>
      <div className={styles.centerblockSearch}>
        <svg className={styles.searchSvg}>
          <use xlinkHref="img/icon/sprite.svg#icon-search" />
        </svg>
        <input
          className={styles.searchText}
          type="search"
          placeholder="Поиск"
          name="search"
        />
      </div>
      <h2 className={styles.centerblockH2}>Треки</h2>
      <Filter tracks={tracks.data} />
      <Playlist tracks={tracks.data} />
    </div>
  );
}
