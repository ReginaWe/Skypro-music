const API_URL =
  "https://webdev-music-003b5b991590.herokuapp.com/catalog/track/all/";

export async function getTracks() {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();
  return data.data;
}
