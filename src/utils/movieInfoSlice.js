import { createSlice } from "@reduxjs/toolkit";
const CurrentMovieInfo = createSlice({
  name: "currentMovieInfo",
  initialState: {
    CurrentMovie: null,
  },

  reducers: {
    addCurrentMovie: (state, action) => {
      state.CurrentMovie = action.payload;
    },
    updateCurrentMovie: (state, action) => {
      state.CurrentMovie = { ...state.CurrentMovie, ...action.payload };
    },
  },
});

// Update the exported actions
export const { addCurrentMovie, updateCurrentMovie } = CurrentMovieInfo.actions;

export default CurrentMovieInfo.reducer;
export const selectCurrentMovieInfo = (state) =>
  state.CurrentMovieInfo.CurrentMovie;
