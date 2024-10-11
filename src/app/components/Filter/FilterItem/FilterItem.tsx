import classNames from "classnames";
import styles from "../Filter.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setFilters } from "@/store/features/playlistSlice";

type FilterItemProps = {
  title: string;
  list: string[];
  isActive: boolean;
  handleFilter: (value: string) => void;
};

export function FilterItem({
  title,
  list,
  isActive,
  handleFilter,
}: FilterItemProps) {
  const dispatch = useAppDispatch();
  const optionList = useAppSelector(
    (state) => state.playlist.filterOptions.author
  );
  function toggleFilter(item: string) {
    dispatch(
      setFilters({
        author: optionList.includes(item)
          ? optionList.filter((el) => el !== item)
          : [...optionList, item],
      })
    );
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
