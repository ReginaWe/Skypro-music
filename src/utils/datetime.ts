export function printTime(num: number) {
    const minutes = Math.floor(num / 60);
    const seconds = num % 60;
    return `${minutes}:${String(seconds).padStart(2, "0")}`
}