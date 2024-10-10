import { fetchFavoriteTracks } from "@/app/api/tracks";
import { SortOptions, TrackType } from "@/app/types/tracks";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react";

export const getFavoriteTracks = createAsyncThunk(
  "playlist/getFavoriteTracks",
  async (tokens: any) => {
    const favoriteTracks = await fetchFavoriteTracks(tokens);
    return favoriteTracks;
  }
);

type PlaylistStateType = {
  currentTrack: null | TrackType;
  playlist: TrackType[];
  shuffledPlaylist: TrackType[];
  isPlaying: boolean;
  isShuffle: boolean;
  likedTracks: TrackType[];
  filterOptions: {
    author: string[];
    year: SortOptions;
    genre: string[];
    searchValue: string;
  };
  filteredTracks: TrackType[];
  initialTracks: TrackType[];
};

const initialState: PlaylistStateType = {
  currentTrack: null,
  playlist: [],
  shuffledPlaylist: [],
  isPlaying: false,
  isShuffle: false,
  likedTracks: [],
  filterOptions: {
    author: [],
    year: "",
    genre: [],
    searchValue: "",
  },
  filteredTracks: [],
  initialTracks: [],
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setInitialTracks: (
      state,
      action: PayloadAction<{ tracks: TrackType[] }>
    ) => {
      state.initialTracks = action.payload.tracks;
      state.filteredTracks = action.payload.tracks;
    },
    setCurrentTrack: (
      state,
      action: PayloadAction<{ track: TrackType; tracks: TrackType[] }>
    ) => {
      state.currentTrack = action.payload.track;
      state.playlist = action.payload.tracks;
      state.shuffledPlaylist = [...action.payload.tracks].sort(
        () => 0.5 - Math.random()
      );
    },
    setNextTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.playlist;
      const currentTrackIndex = playlist.findIndex(
        (track) => track._id === state.currentTrack?._id
      );
      const newTrack = playlist[currentTrackIndex + 1];
      if (newTrack) {
        state.currentTrack = newTrack;
      }
    },
    setPrevTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.playlist;
      const currentTrackIndex = playlist.findIndex(
        (track) => track._id === state.currentTrack?._id
      );
      const newTrack = playlist[currentTrackIndex - 1];
      if (newTrack) {
        state.currentTrack = newTrack;
      }
    },
    setIsPlaying: (state, action: PayloadAction<boolean | string>) => {
      if (typeof action.payload === "string") {
        state.isPlaying = !state.isPlaying;
      } else {
        state.isPlaying = action.payload;
      }
    },
    setIsShuffle: (state, action: PayloadAction<boolean | string>) => {
      if (typeof action.payload === "string") {
        state.isShuffle = !state.isShuffle;
      } else {
        state.isShuffle = action.payload;
      }
    },
    setLikeTrack: (state, action: PayloadAction<TrackType>) => {
      state.likedTracks.push(action.payload);
    },
    setDislikeTrack: (state, action: PayloadAction<TrackType>) => {
      state.likedTracks = state.likedTracks.filter(
        (track) => track._id !== action.payload._id
      );
    },
    setFilters: (
      state,
      action: PayloadAction<{
        author?: string[];
        searchValue?: string;
        year?: SortOptions;
        genre?: string[];
      }>
    ) => {
      state.filterOptions = {
        author: action.payload.author || state.filterOptions.author,
        searchValue:
          action.payload.searchValue || state.filterOptions.searchValue,
        year: action.payload.year || state.filterOptions.year,
        genre: action.payload.genre || state.filterOptions.genre,
      };
      state.filteredTracks = state.initialTracks.filter((track) => {
        const hasAuthors = state.filterOptions.author.length !== 0;
        const isAuthors = hasAuthors
          ? state.filterOptions.author.includes(track.author)
          : true;
        const hasGenres = state.filterOptions.genre.length !== 0;
        const isGenres = hasGenres
          ? state.filterOptions.genre.includes(track.genre)
          : true;

        const hasSearchValue = track.name
          .toLowerCase()
          .includes(state.filterOptions.searchValue.toLowerCase());
        return isAuthors && isGenres && hasSearchValue;
      });
      if (state.filterOptions.year) {
        state.filteredTracks.sort((a, b) => {
          const delta =
            new Date(a.release_date).getTime() -
            new Date(b.release_date).getTime();
          if (state.filterOptions.year === "убыв") {
            return -delta;
          } else {
            return delta;
          }
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFavoriteTracks.fulfilled, (state, action) => {
      state.likedTracks = action.payload;
    });
  },
});
export const {
  setInitialTracks,
  setCurrentTrack,
  setNextTrack,
  setIsPlaying,
  setIsShuffle,
  setPrevTrack,
  setDislikeTrack,
  setLikeTrack,
  setFilters,
} = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;
