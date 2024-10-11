"use client"

import { useAppDispatch } from "@/hooks/hooks";
import styles from "./SearchBar.module.css";
import { ChangeEvent, useState } from "react";
import { setFilters } from "@/store/features/playlistSlice";

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
    dispatch(setFilters({ searchValue: e.target.value }));
  }
  return (
    <div className={styles.searchBar}>
      <svg className={styles.searchSvg}>
        <use xlinkHref="img/icon/sprite.svg#icon-search" />
      </svg>
      <input
        className={styles.searchText}
        type="search"
        placeholder="Поиск"
        name="search"
        value={searchValue}
        onChange={handleChange}
      />
    </div>
  );
}
