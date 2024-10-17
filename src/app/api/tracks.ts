import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { CategoryDataType, TrackType } from "../types/tracks";

const API_URL =
  "https://webdev-music-003b5b991590.herokuapp.com/catalog/track/all/";

const BASE_URL = "https://webdev-music-003b5b991590.herokuapp.com/catalog/";
const URL_Selection = "https://webdev-music-003b5b991590.herokuapp.com/catalog/selection/"

export async function getTracks():Promise<TrackType[]> {
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
    `${BASE_URL}/track/${trackId}/favorite/`,
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

export async function dislikeTrack({
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
      method: "DELETE",
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
}): Promise<TrackType[]> {
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
  const data = await res.json();
  return data.data;
}

export async function fetchSelectionTracks(id: string): Promise<CategoryDataType> {
  const res = await fetch(URL_Selection + id);

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();
  return data.data;
}
