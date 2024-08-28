import classNames from "classnames";
import styles from "../Filter.module.css";

type FilterItemProps = {
  title: string;
  list: string[];
  isActive: boolean;
  handleFilter: (value: string) => void;
};

export function FilterItem({ title, list, isActive }: FilterItemProps) {
  return (
    <div className={styles.filterWrapper}>
      <button className={classNames(styles.filterButton, styles._btnText)}>
        {title}
      </button>
      {isActive && (
        <ul className={styles.filterList}>
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
