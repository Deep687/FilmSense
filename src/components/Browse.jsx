import { useSelector } from "react-redux";
import { selectTopRatedMovies } from "../utils/movieList";
import useTopRatedMovies from "../Constants/useTopRatedMovies";
import MainComponent from "./MiniComponents/MainComponenet";
const Browse = () => {
  useTopRatedMovies();
  const topRatedMovies = useSelector(selectTopRatedMovies);
  if (topRatedMovies === null) return;

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <main className="container">
        <MainComponent />
      </main>
    </div>
  );
};

export default Browse;
