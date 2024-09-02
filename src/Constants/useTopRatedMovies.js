import { API_URL, API_OPTIONS } from "./constants";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addTopRatedMovies } from "../utils/movieList";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const fetchTopRatedMovies = async () => {
    const data = await fetch(API_URL, API_OPTIONS);
    const response = await data.json();

    dispatch(addTopRatedMovies(response.results));
  };

  useEffect(() => {
    fetchTopRatedMovies();
  }, []);
};
export default useTopRatedMovies;
