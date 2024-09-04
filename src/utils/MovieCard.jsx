import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa";

const MovieCard = ({ movie }) => (
  <div className="w-40 h-64 bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg overflow-hidden mx-1.5 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl border border-gray-700">
    <div className="relative">
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.original_title}
        className="w-full h-48 object-cover"
      />
      <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white text-sm px-2 py-1 flex items-center rounded">
        <FaStar className="text-yellow-400 mr-1" />
        <span>{movie.vote_average.toFixed(1)}</span>
      </div>
    </div>
    <div className="p-2">
      <h3 className="text-md font-semibold text-white truncate">
        {movie.original_title}
      </h3>
      <p className="text-sm text-gray-400 mt-1 truncate">{movie.title}</p>
    </div>
  </div>
);

MovieCard.propTypes = {
  movie: PropTypes.shape({
    original_title: PropTypes.string,
    poster_path: PropTypes.string,
    vote_average: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
};

export default MovieCard;
