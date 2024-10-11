"use client";
import styles from "../../page.module.css";
import Filter from "../../components/Filter/Filter";
import Playlist from "../../components/Playlist/Playlist";
import { useAppSelector } from "@/hooks/hooks";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { checkUser } from "@/store/features/authSlice";

export default function Favorites() {
  const likedTracks = useAppSelector((state) => state.playlist.likedTracks);
  const hasUser = useAppSelector(checkUser);

  function doRedirectIfNeeds() {
    if (!hasUser) {
      redirect("/tracks");
    }
  }
  useEffect(() => {
    doRedirectIfNeeds();
  }, [hasUser]);

  doRedirectIfNeeds();

  return (
    <>
      <h2 className={styles.centerblockH2}>Избранные треки</h2>
      <Filter tracks={likedTracks} />
      <Playlist tracks={likedTracks} />
    </>
  );
}
