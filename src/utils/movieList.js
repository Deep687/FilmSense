import { createSlice } from "@reduxjs/toolkit";
const movieList = createSlice({
  name: "movies",
  initialState: {
    topRatedMovies: null,
    trailer: null,
    movieInfo: null,
  },

  reducers: {
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addTrailer: (state, action) => {
      state.trailer = action.payload;
    },
    addMovieInfo: (state, action) => {
      state.movieInfo = action.payload;
    },
  },
});
export const { addTopRatedMovies, addTrailer, addMovieInfo } =
  movieList.actions;
export default movieList.reducer;

export const selectTopRatedMovies = (state) => state.movieList.topRatedMovies;
export const selectTrailer = (state) => state.movieList.trailer;
export const selectMovieInfo = (state) => state.movieList.movieInfo;
