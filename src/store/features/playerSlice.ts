import { fetchFavoriteTracks } from "@/app/api/tracks";
import { SortOptions, TrackType } from "@/app/types/tracks";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TokensType } from "./authSlice";

export const getFavoriteTracks = createAsyncThunk(
  "player/getFavoriteTracks",
  async (tokens: TokensType) => {
    const favoriteTracks = await fetchFavoriteTracks(tokens);
    return favoriteTracks;
  }
);

type PlayerStateType = {
  currentTrack: null | TrackType;
  initialTracks: TrackType[]; // all
  likedTracks: TrackType[]; // favorites
  visibleTracks: TrackType[];
  filteredTracks: TrackType[]; // visible + filters + sort
  soundPlaylist: TrackType[]; // active / playing
  shuffledPlaylist: TrackType[]; // active + shuffle
  categoryName: string;
  isPlaying: boolean;
  isShuffle: boolean;
  filterOptions: {
    author: string[];
    year: SortOptions;
    genre: string[];
    searchValue: string;
  };
};

const initialState: PlayerStateType = {
  currentTrack: null,
  initialTracks: [],
  likedTracks: [],
  visibleTracks: [],
  filteredTracks: [],
  soundPlaylist: [],
  shuffledPlaylist: [],
  isPlaying: false,
  isShuffle: false,
  categoryName: "",
  filterOptions: {
    author: [],
    year: "",
    genre: [],
    searchValue: "",
  },
};
const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setInitialTracks: (
      state,
      action: PayloadAction<{ tracks: TrackType[] }>
    ) => {
      state.initialTracks = action.payload.tracks;
      state.visibleTracks = action.payload.tracks;
      state.filteredTracks = action.payload.tracks;
    },
    setVisibleTracks: (
      state,
      action: PayloadAction<{ tracks: TrackType[] }>
    ) => {
      state.visibleTracks = action.payload.tracks;
      state.filteredTracks = action.payload.tracks;
    },
    setCurrentTrack: (
      state,
      action: PayloadAction<{ track: TrackType; tracks: TrackType[] }>
    ) => {
      state.currentTrack = action.payload.track;
      state.soundPlaylist = action.payload.tracks;
      state.shuffledPlaylist = [...action.payload.tracks].sort(
        () => 0.5 - Math.random()
      );
    },
    setNextTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.soundPlaylist;
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
        : state.soundPlaylist;
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
    setCategoryName: (state, action: PayloadAction<string>) => {
      state.categoryName = action.payload;
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
        year:
          action.payload.year === ""
            ? ""
            : action.payload.year || state.filterOptions.year,
        genre: action.payload.genre || state.filterOptions.genre,
      };
      console.log(state.filterOptions.genre);
      state.filteredTracks = state.visibleTracks.filter((track) => {
        const hasAuthors = state.filterOptions.author.length !== 0;
        const isAuthors = hasAuthors
          ? state.filterOptions.author.includes(track.author)
          : true;
        const hasGenres = state.filterOptions.genre.length !== 0;
        const isGenres = hasGenres
          ? track.genre.reduce(
              (acc, item) => acc || state.filterOptions.genre.includes(item),
              false
            )
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
  setVisibleTracks,
  setCurrentTrack,
  setNextTrack,
  setIsPlaying,
  setIsShuffle,
  setPrevTrack,
  setDislikeTrack,
  setLikeTrack,
  setCategoryName,
  setFilters,
} = playerSlice.actions;
export const playerReducer = playerSlice.reducer;
