import { TrackType } from "@/app/types/tracks";

export function getUniqueValues(
  items: TrackType[],
  field: keyof TrackType
): string[] {
  const uniqueValues = new Set<string>();
  if (field === "author") {
    items.forEach((item) => {
      uniqueValues.add(item.author);
    });
  } else if (field === "genre") {
    items.forEach((item) => {
      item.genre.forEach((genre) => {
        uniqueValues.add(genre);
      })
    });
  }
  return Array.from(uniqueValues);
}
