import { useSelector } from "react-redux";
import { selectTopRatedMovies } from "../../utils/movieList";
import MovieCard from "../../utils/MovieCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import Google Font
import "@fontsource/roboto"; // Example: Roboto font

const SecondContainer = () => {
  const topRatedMovies = useSelector(selectTopRatedMovies);

  const settings = {
    dots: false,
    infinite: false, // Ensure cards do not repeat
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    arrows: false, // Remove navigation buttons
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
        },
      },
    ],
  };

  return (
    <div className="p-6  mx-28">
      <h2
        className="text-3xl font-semibold mb-6 text-white"
        style={{ fontFamily: "Roboto, sans-serif" }}
      >
        Top Rated Movies
      </h2>
      <Slider {...settings}>
        {topRatedMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Slider>
    </div>
  );
};

export default SecondContainer;
