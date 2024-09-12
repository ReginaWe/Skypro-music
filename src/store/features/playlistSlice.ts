import { TrackType } from "@/app/types/tracks";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PlaylistStateType =  {
  currentTrack: null | TrackType,
  playlist: TrackType[]
}

const initialState: PlaylistStateType = {
    currentTrack: null,
    playlist: [],
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<{track: TrackType, tracks: TrackType[]}>) => {
      state.currentTrack = action.payload.track;
      state.playlist = action.payload.tracks;
    },
  },
});

export const { setCurrentTrack } = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;