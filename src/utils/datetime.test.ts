import { printTime } from "./datetime";

describe("Функция форматирование времени", () => {
  it("Правильно форматирует число в строку", () => {
    const result = printTime(6);
    expect(result).toBe("0:06");
  });

  it("Правильно форматирует некорректное число в строку", () => {
    const result = printTime(0);
    expect(result).toBe("0:00");
  });
});
