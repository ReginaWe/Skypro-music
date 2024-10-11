import styles from "../page.module.css";
import Filter from "../components/Filter/Filter";
import Playlist from "../components/Playlist/Playlist";
import { getTracks } from "@/app/api/tracks";
import { TrackType } from "@/app/types/tracks";

export default async function Home() {
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
    <>
      <h2 className={styles.centerblockH2}>Треки</h2>
      <Filter tracks={tracks} />
      {error || <Playlist tracks={tracks} />}
      {/* {error ? <p>{error}</p> : <Playlist tracks={tracks} />} */}
    </>
  );
}
