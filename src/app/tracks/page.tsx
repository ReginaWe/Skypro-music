"use client";

import styles from "../page.module.css";
import Filter from "../components/Filter/Filter";
import Playlist from "../components/Playlist/Playlist";
import { getTracks } from "@/app/api/tracks";
import { TrackType } from "@/app/types/tracks";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setInitialTracks } from "@/store/features/playlistSlice";
import { useEffect, useState } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  /* const [tracks, setTracks] = useState<TrackType[]>([]); */
  const {filteredTracks, initialTracks} = useAppSelector(
    (state) => state.playlist
  );
  /* let tracks: TrackType[] = []; */
  let error: string = "";
  /* try {
    tracks = await getTracks();
    
  } catch (err: unknown) {
    error =
      err instanceof Error
        ? "Ошибка при загрузке треков " + err.message
        : "Неизвестная ошибка";
  } */
  useEffect(() => {
    getTracks().then((data) => {
      dispatch(setInitialTracks({ tracks: data }));
      console.log(data);
    });
  }, []);

  return (
    <>
      <h2 className={styles.centerblockH2}>Треки</h2>
      <Filter tracks={initialTracks} />
      {error || <Playlist tracks={initialTracks} />}
      {/* {error ? <p>{error}</p> : <Playlist tracks={tracks} />} */}
    </>
  );
}
