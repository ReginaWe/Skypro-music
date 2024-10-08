import { fetchWithAuth } from "@/utils/fetchWithAuth";

const API_URL =
  "https://webdev-music-003b5b991590.herokuapp.com/catalog/track/all/";

const BASE_URL = "https://webdev-music-003b5b991590.herokuapp.com/catalog/";

export async function getTracks() {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();
  return data.data;
}

export async function likeTrack({
  trackId,
  access,
  refresh,
}: {
  trackId: number;
  access: string;
  refresh: string;
}) {
  const res = await fetchWithAuth(
    BASE_URL + `/track/${trackId}/favorite/`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    },
    refresh
  );
  return res.json();
}

export async function fetchFavoriteTracks({
  access,
  refresh,
}: {
  access: string;
  refresh: string;
}) {
  const res = await fetchWithAuth(
    BASE_URL + `/track/favorite/all/`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    },
    refresh
  );
  return res.json();
}
