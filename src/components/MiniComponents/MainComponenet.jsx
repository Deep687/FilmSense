import { useSelector } from "react-redux";
import { selectTopRatedMovies } from "../../utils/movieList";
import { OPTIONS } from "../../Constants/constants";
import { useEffect, useState } from "react";
import VideoBg from "./VideoBg";
import TextContainer from "./TextContainer";

const MainComponent = () => {
  const filtermovieList = useSelector(selectTopRatedMovies);
  const videoMovie = filtermovieList[7];
  console.log(videoMovie);
  const [trailer, setTrailer] = useState(null);

  const fetchMovieData = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${videoMovie.id}/videos`,
        OPTIONS
      );
      const json = await data.json();
      console.log(json);

      const trailerVideos = json.results.filter(
        (result) => result.type === "Trailer"
      );
      if (!trailerVideos || trailerVideos.length === 0) {
        if (json.results.length > 0) {
          setTrailer(json.results[0]);
        }
      } else {
        setTrailer(trailerVideos[0] || trailerVideos[1]);
      }
    } catch (error) {
      console.error("Failed to fetch movie data:", error);
    }
  };
  console.log(trailer);
  useEffect(() => {
    fetchMovieData();
  }, []);
  return (
    <div>
      {trailer && (
        <div>
          <VideoBg data={trailer} />
          <TextContainer data={videoMovie} />
        </div>
      )}
    </div>
  );
};

export default MainComponent;
