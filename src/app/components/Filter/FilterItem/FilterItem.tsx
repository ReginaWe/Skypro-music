import classNames from "classnames";
import styles from "../Filter.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setFilters } from "@/store/features/playerSlice";
import { SortOptions } from "@/app/types/tracks";

type FilterItemProps = {
  filterName: string;
  title: string;
  list: string[];
  isActive: boolean;
  handleFilter: (value: string) => void;
};

const sortKeys: Record<SortOptions, string> = {
  "": "По умолчанию",
  возр: "Сначала старые",
  убыв: "Сначала новые",
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
    (state) => state.player.filterOptions[filterName]
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
          year:
            item === "По умолчанию"
              ? ""
              : item === "Сначала новые"
              ? "убыв"
              : "возр",
        })
      );
    }
  }
  return (
    <div className={styles.filterWrapper}>
      <div
        onClick={() => handleFilter(title)}
        className={classNames(styles.filterButton, styles._btnText, {
          [styles.active]: optionList.length,
        })}
      >
        {title}
      </div>
      {Boolean(
        optionList.length && (filterName === "author" || filterName === "genre")
      ) && <div className={styles.filterNumber}>{optionList.length}</div>}
      {isActive && (
        <div className={styles.filterListContainer}>
          <ul className={styles.filterList}>
            {list.map((item, index) => (
              <li
                onClick={() => toggleFilter(item)}
                className={classNames(styles.filterItem, {
                  [styles.active]:
                    (optionList.length && optionList.includes(item)) ||
                    sortKeys[optionList as SortOptions] === item, // optionList === "" && item === "По умолчанию" || optionList === "возр" && item === "Сначала старые" || optionList === "убыв" && item === "Сначала новые"
                })}
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
