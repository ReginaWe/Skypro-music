"use client";
import styles from "../../page.module.css";
import Filter from "../../components/Filter/Filter";
import Playlist from "../../components/Playlist/Playlist";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { checkUser } from "@/store/features/authSlice";
import { setVisibleTracks } from "@/store/features/playerSlice";

export default function Favorites() {
  const dispatch = useAppDispatch();
  const { likedTracks, visibleTracks, filteredTracks } = useAppSelector(
    (state) => state.player
  );
  console.log("liked:", likedTracks);
  console.log("visible:", visibleTracks);
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

  useEffect(() => {
    dispatch(setVisibleTracks({tracks: likedTracks}));
  }, []);

  if (!visibleTracks.length) {
    return <p>ошибка</p>;
  }
  return (
    <>
      <h2 className={styles.centerblockH2}>Избранные треки</h2>
      <Filter tracks={visibleTracks} />
      <Playlist tracks={filteredTracks} />
    </>
  );
}
