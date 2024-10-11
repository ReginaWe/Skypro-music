import React from "react";
import styles from "./ProgressBar.module.css";

type ProgressBarProps = {
    max: number,
    value: number,
    step: number,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ProgressBar = React.memo(({ max, value, step, onChange }: ProgressBarProps) => {
  return (
    <input
	    className={styles.progressInput}
	    type="range" // Тип элемента - ползунок
	    min="0" // Минимальное значение ползунка
	    max={max} // Максимальное значение, зависит от длительности аудио
	    value={value} // Текущее значение ползунка
	    step={step} // Шаг изменения значения
	    onChange={onChange} // Обработчик события изменения
	  />
  );
})
ProgressBar.displayName = "ProgressBar"
export default ProgressBar