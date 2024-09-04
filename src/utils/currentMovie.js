import { createSlice } from "@reduxjs/toolkit";

const currentMovieSlice = createSlice({
  name: "currentMovie",
  initialState: {
    movie: null, // Changed from currentMovie to movie
  },
  reducers: {
    setMovie: (state, action) => {
      // Changed from addCurrentMovie to setMovie
      state.movie = action.payload;
    },
  },
});

export const { setMovie } = currentMovieSlice.actions; // Updated export name
export default currentMovieSlice.reducer;
export const selectCurrentMovie = (state) => state.currentMovie.movie; // Updated selector
