import { useSelector } from "react-redux";
import { selectMovieInfo } from "../../utils/movieList";
import { useEffect, useState, useCallback, useMemo } from "react";

const CastComponent = () => {
  const movieInfo = useSelector(selectMovieInfo);
  const [cast, setCast] = useState([]);

  const options = useMemo(
    () => ({
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTZjN2QzYTY0ZWFlMWM2MTRlZjBhNWFhNTY2NjM5ZSIsIm5iZiI6MTcyNTM1MjM2Ni40OTIzODMsInN1YiI6IjY2ZDJmOTYyOTExY2Y2NWQzZjc4Y2VkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sNFeeS_RkH80XD5bzrM88y0PBUHC69m107YN0a-ZdA4",
      },
    }),
    []
  );

  const fetchCast = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieInfo.id}/credits?language=en-US`,
        options
      );
      const data = await response.json();
      const castJson = data.cast.filter(
        (cast) => cast.known_for_department === "Acting"
      );
      const castData = castJson.slice(0, 5);
      setCast(castData);
      // Remove or comment out the console.log(cast) line
    } catch (error) {
      console.error("Error fetching cast:", error);
    }
  }, [movieInfo.id, options]); // Remove options from the dependency array

  useEffect(() => {
    if (movieInfo.id) {
      fetchCast();
    }
  }, [movieInfo.id, fetchCast]);

  return (
    <div className="my-4 p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
        Top Cast
      </h3>
      <div className="flex flex-nowrap overflow-x-auto">
        {cast.map((actor) => (
          <div
            key={actor.id}
            className="flex-shrink-0 mr-4 last:mr-0 border-r-2 border-gray-300 pr-4"
          >
            <div className="flex items-center">
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                className="w-12 h-12 rounded-full mr-3 object-cover"
              />
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {actor.name}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {actor.character}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastComponent;
