import { createSlice } from "@reduxjs/toolkit";
const movieList = createSlice({
  name: "movies",
  initialState: {
    topRatedMovies: null,
  },

  reducers: {
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
  },
});
export const { addTopRatedMovies } = movieList.actions;
export default movieList.reducer;
export const selectTopRatedMovies = (state) => state.movieList.topRatedMovies;
