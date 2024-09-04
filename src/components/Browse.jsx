import { useDispatch, useSelector } from "react-redux";

import { selectTopRatedMovies, addMovieInfo } from "../utils/movieList";
import useTopRatedMovies from "../customHooks/useTopRatedMovies";
import MainComponent from "./MiniComponents/MainComponenet";
import Header from "./Header";
import { useEffect } from "react";
import Image from "../Constants/image.jpg";
import SecondContainer from "./MiniComponents/SecondContainer";

const Browse = () => {
  useTopRatedMovies();
  const movies = useSelector(selectTopRatedMovies);
  const dispatch = useDispatch();

  const fetchMovieInfo = async () => {
    if (!movies || movies.length === 0) return;

    const movie = movies[7];
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTZjN2QzYTY0ZWFlMWM2MTRlZjBhNWFhNTY2NjM5ZSIsIm5iZiI6MTcyNTM1MjM2Ni40OTIzODMsInN1YiI6IjY2ZDJmOTYyOTExY2Y2NWQzZjc4Y2VkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sNFeeS_RkH80XD5bzrM88y0PBUHC69m107YN0a-ZdA4",
            accept: "application/json",
          },
        }
      );
      const movieInfo = await response.json();

      dispatch(addMovieInfo(movieInfo));
    } catch (error) {
      console.error("Error fetching movie info:", error);
    }
  };

  useEffect(() => {
    fetchMovieInfo();
  }, [movies]);

  if (!movies) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      <div
        className="bg-cover bg-center min-h-screen mb-0"
        style={{ backgroundImage: `url(${Image})` }}
      >
        <Header />
        <main className="container px-4 md:px-0">
          <MainComponent />
        </main>
      </div>
      <div className="bg-cover bg-center min-h-screen mt-0">
        <SecondContainer />
      </div>
    </div>
  );
};

export default Browse;
