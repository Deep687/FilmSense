import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectMovieInfo } from "../../utils/movieList";

const TextContainer = () => {
  const movieInfo = useSelector(selectMovieInfo);

  if (!movieInfo) {
    console.log("MovieInfo is null in TextContainer");
    return <div className="animate-pulse bg-gray-800 h-96 rounded-lg"></div>;
  }

  return (
    // Updated container class to include modern font family
    <div className="text-white w-3/5 ml-12 mt-20 sm:ml-8 md:ml-12 lg:ml-28 pr-4 sm:pr-6 lg:pr-8 font-sans">
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="bg-yellow-400 text-black px-3 py-1 rounded-full flex items-center">
          <FaStar className="mr-1" />
          <span className="font-bold">
            {movieInfo.vote_average?.toFixed(1)}
          </span>
        </div>
        <div className="text-sm bg-gray-700 px-3 py-1 rounded-full">
          {movieInfo.original_language.toUpperCase()}
        </div>
        <div className="text-sm bg-gray-700 px-3 py-1 rounded-full">
          {new Date(movieInfo.release_date).getFullYear()}
        </div>
      </div>

      {/* Updated title styling */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight tracking-tight">
        {movieInfo.original_title}
      </h1>

      {/* Updated tagline styling */}
      <p className="text-lg sm:text-xl mb-6 italic text-gray-300 font-light">
        {movieInfo.tagline}
      </p>

      {/* Updated overview styling */}
      <p className="text-base sm:text-lg mb-8 leading-relaxed max-w-3xl font-normal">
        {movieInfo.overview}
      </p>

      {/* Updated button styling */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-2xl transition duration-300 ease-in-out transform hover:scale-105 uppercase tracking-wide">
          Watch Now
        </button>
      </div>
    </div>
  );
};

export default TextContainer;
