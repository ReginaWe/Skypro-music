import styles from "./SearchBar.module.css";

export default function SearchBar() {
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
      />
    </div>
  );
}
