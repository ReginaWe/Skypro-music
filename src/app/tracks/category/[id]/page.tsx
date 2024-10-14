"use client";
import Filter from "@/app/components/Filter/Filter";
import Playlist from "@/app/components/Playlist/Playlist";
import styles from "../../../page.module.css";
import { fetchSelectionTracks } from "@/app/api/tracks";
import { getTracks } from "../../../api/tracks";
import { TrackType } from "@/app/types/tracks";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  setCategoryName,
  setInitialTracks,
  setVisibleTracks,
} from "@/store/features/playerSlice";
type CategoryProps = {
  params: { id: string };
};

export default function CategoryPage({ params }: CategoryProps) {
  const dispatch = useAppDispatch();
  const { visibleTracks, filteredTracks, categoryName } = useAppSelector(
    (state) => state.player
  );
  useEffect(() => {
    Promise.all([getTracks(), fetchSelectionTracks(params.id)]).then(
      ([tracks, categoryData]) => {
        const categoryTracks = tracks.filter((item: TrackType) =>
          categoryData && categoryData.items.includes(item._id)
        );
        dispatch(setCategoryName(categoryData.name));
        dispatch(setInitialTracks({tracks}));
        dispatch(setVisibleTracks({tracks: categoryTracks}));
      }
    );
  }, [params.id]);

  return (
    <>
      <h2 className={styles.centerblockH2}>{categoryName}</h2>
      <Filter tracks={visibleTracks} />
      <Playlist tracks={filteredTracks} />
    </>
  );
}
