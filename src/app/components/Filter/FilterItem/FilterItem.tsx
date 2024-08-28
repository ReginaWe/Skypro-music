import classNames from "classnames";
import styles from "../Filter.module.css";

type FilterItemProps = {
  title: string;
  list: string[];
  isActive: boolean;
  handleFilter: (value: string) => void;
};

export function FilterItem({ title, list, isActive, handleFilter }: FilterItemProps) {
  return (
    <div className={styles.filterWrapper}>
      <button onClick={() => handleFilter(title)} className={classNames(styles.filterButton, styles._btnText)}>
        {title}
      </button>
      {isActive && (
        <ul className={styles.filterList}>
          {list.map((item, index) => (
            <li className={styles.filterItem} key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
