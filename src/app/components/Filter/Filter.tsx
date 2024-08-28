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
        list={getUniqueAuthors}
        handleFilter={handleFilter}
      />
      <FilterItem
        title={"жанру"}
        isActive={activeFilter === "жанру"}
        list={getUniqueAuthors}
        handleFilter={handleFilter}
      />
    </div>
  );
}

export default Filter;
