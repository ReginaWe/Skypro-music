"use client";

import styles from "../page.module.css";
import Filter from "../components/Filter/Filter";
import Playlist from "../components/Playlist/Playlist";
import { getTracks } from "@/app/api/tracks";
import { TrackType } from "@/app/types/tracks";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setInitialTracks } from "@/store/features/playerSlice";
import { useEffect, useState } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  /* const [tracks, setTracks] = useState<TrackType[]>([]); */
  const { visibleTracks, filteredTracks } = useAppSelector(
    (state) => state.player
  );
  /* let tracks: TrackType[] = []; */
  let error: string = "";
  
  useEffect(() => {
    getTracks().then((data) => {
      dispatch(setInitialTracks({ tracks: data }));
      console.log(data);
    });
  }, []);

  return (
    <>
      <h2 className={styles.centerblockH2}>Треки</h2>
      <Filter tracks={visibleTracks} />
      {error || <Playlist tracks={filteredTracks} />}
    </>
  );
}
