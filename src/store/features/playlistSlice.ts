import { TrackType } from "@/app/types/tracks";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PlaylistStateType = {
  currentTrack: null | TrackType;
  playlist: TrackType[];
  shuffledPlaylist: TrackType[];
  isPlaying: boolean;
  isShuffle: boolean;
};

const initialState: PlaylistStateType = {
  currentTrack: null,
  playlist: [],
  shuffledPlaylist: [],
  isPlaying: false,
  isShuffle: false,
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
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
        state.isPlaying = !state.isPlaying
      } else {
        state.isPlaying = action.payload;
      }
    },
    setIsShuffle: (state, action: PayloadAction<boolean | string>) => {
      if (typeof action.payload === "string") {
        state.isShuffle = !state.isShuffle
      } else {
        state.isShuffle = action.payload;
      }
    },
  },
});

export const { setCurrentTrack, setNextTrack, setIsPlaying, setIsShuffle, setPrevTrack } =
  playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;
