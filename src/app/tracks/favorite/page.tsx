"use client";
import styles from "../../page.module.css";
import Filter from "../../components/Filter/Filter";
import Playlist from "../../components/Playlist/Playlist";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getTracks } from "@/app/api/tracks";
import { TrackType } from "@/app/types/tracks";

export default function Favorites() {
  const likedTracks = useAppSelector((state) => state.playlist.likedTracks);

  return (
    <>
      <h2 className={styles.centerblockH2}>Треки 555</h2>
      <Filter tracks={likedTracks} />
      <Playlist tracks={likedTracks} />
    </>
  );
}
