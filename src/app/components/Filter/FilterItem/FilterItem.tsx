import classNames from "classnames";
import styles from "../Filter.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setFilters } from "@/store/features/playlistSlice";

type FilterItemProps = {
  filterName: string;
  title: string;
  list: string[];
  isActive: boolean;
  handleFilter: (value: string) => void;
};

export function FilterItem({
  filterName,
  title,
  list,
  isActive,
  handleFilter,
}: FilterItemProps) {
  const dispatch = useAppDispatch();
  const optionList = useAppSelector(
    (state) => state.playlist.filterOptions[filterName]
  );
  function toggleFilter(item: string) {
    console.log(filterName, item);
    if (filterName === "author" || filterName === "genre") {
      dispatch(
        setFilters({
          [filterName]: optionList.includes(item)
            ? optionList.filter((el: string) => el !== item)
            : [...optionList, item],
        })
      );
    } else {
      dispatch(
        setFilters({
          year: item === "По умолчанию" ? "" : item === "Сначала новые" ? "убыв" : "возр"
        })
      );
    }
  }
  return (
    <div className={styles.filterWrapper}>
      <div
        onClick={() => handleFilter(title)}
        className={classNames(styles.filterButton, styles._btnText)}
      >
        {title}
      </div>
      {isActive && (
        <div className={styles.filterListContainer}>
          <ul className={styles.filterList}>
            {list.map((item, index) => (
              <li
                onClick={() => toggleFilter(item)}
                className={styles.filterItem}
                key={index}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
