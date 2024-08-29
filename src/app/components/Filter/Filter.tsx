"use client";

import { TrackType } from "@/app/types/tracks";
import styles from "./Filter.module.css";
import classNames from "classnames";
import { getUniqueValues } from "@/utils/getUniqueValues";
import { FilterItem } from "./FilterItem/FilterItem";
import { useState } from "react";

const SORT_OPTIONS = ["По умолчанию", "Сначала новые", "Сначала старые"];

type FilterProps = {
  tracks: TrackType[];
};

export function Filter({ tracks }: FilterProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const getUniqueAuthors = getUniqueValues(tracks, "author");
  /* const getUniqueHours = getUniqueValues(tracks, "release_date"); */
  const getUniqueGenre = getUniqueValues(tracks, "genre");

  function handleFilter(filterName: string) {
    setActiveFilter((prev) => (prev === filterName ? null : filterName));
  }

  return (
    <div className={styles.centerblockFilter}>
      <div className={styles.filterTitle}>Искать по:</div>
      <FilterItem
        title={"исполнителю"}
        isActive={activeFilter === "исполнителю"}
        list={getUniqueAuthors}
        handleFilter={handleFilter}
      />
      <FilterItem
        title={"году выпуска"}
        isActive={activeFilter === "году выпуска"}
        list={SORT_OPTIONS}
        handleFilter={handleFilter}
      />
      <FilterItem
        title={"жанру"}
        isActive={activeFilter === "жанру"}
        list={getUniqueGenre}
        handleFilter={handleFilter}
      />
    </div>
  );
}

export default Filter;
