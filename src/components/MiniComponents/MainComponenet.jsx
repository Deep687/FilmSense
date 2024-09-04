import { useSelector } from "react-redux";
import { selectMovieInfo } from "../../utils/movieList";

import TextContainer from "./TextContainer";

import ImageCard from "./ImageCard";
import CastComponent from "./CastComponent";

const MainComponent = () => {
  const movieInfo = useSelector(selectMovieInfo);

  if (!movieInfo) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div>
      <div className="hero flex flex-col xs:flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row">
        <div className="w-full px-2 xs:px-3 sm:px-4 md:w-full lg:w-3/4 xl:w-3/4">
          <TextContainer />
        </div>
        <div className="image mt-4 mx-auto xs:mt-6 sm:mt-8 md:mt-10 lg:mt-20 lg:mr-20 xl:mt-20 xl:mr-20">
          <ImageCard />
        </div>
      </div>
      <div className="mx-2 xs:mx-3 sm:mx-4 md:mx-6 lg:ml-32 xl:ml-32">
        <CastComponent />
      </div>
    </div>
  );
};

export default MainComponent;
