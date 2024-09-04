import userReducer from "./userSlice";
import movieListReducer from "./movieList";
import { configureStore } from "@reduxjs/toolkit";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movieList: movieListReducer,
  },
});

export default appStore;
