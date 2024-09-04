import { useSelector } from "react-redux";
import { selectMovieInfo } from "../../utils/movieList";
import { useState, useEffect } from "react";

const ImageCard = () => {
  const [imageUrl, setImageUrl] = useState("");
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTZjN2QzYTY0ZWFlMWM2MTRlZjBhNWFhNTY2NjM5ZSIsIm5iZiI6MTcyNTM1MjM2Ni40OTIzODMsInN1YiI6IjY2ZDJmOTYyOTExY2Y2NWQzZjc4Y2VkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sNFeeS_RkH80XD5bzrM88y0PBUHC69m107YN0a-ZdA4",
    },
  };
  const movieInfo = useSelector(selectMovieInfo);

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieInfo.id}/images`,
          options
        );
        const data = await response.json();
        if (data.posters && data.posters.length > 0) {
          setImageUrl(
            `https://image.tmdb.org/t/p/w500${data.posters[0].file_path}`
          );
        }
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    };

    fetchImageData();
  }, [movieInfo.id]);

  return (
    <div className="w-64 h-96 overflow-hidden relative transform transition-all duration-300 hover:scale-105 mr-28">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-400 to-purple-500 opacity-50 blur-md"></div>
      <div className="absolute inset-0 z-10 bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm border border-white border-opacity-20 shadow-lg"></div>
      {imageUrl && (
        <div className="w-full h-full relative z-20 p-1">
          {" "}
          {/* Added padding */}
          <img
            src={imageUrl}
            alt="Movie backdrop"
            className="w-full h-full object-cover object-center border-2 border-white"
          />
        </div>
      )}
    </div>
  );
};

export default ImageCard;
