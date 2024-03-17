import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../utils/customHooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopulerMovies from "../utils/customHooks/usePopulerMovies";
import useTopRatedMovies from "../utils/customHooks/useTopRatedMovies";
import useUpcomingMovies from "../utils/customHooks/useUpcomingMovies";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";

const Browse = () => {
  const showGptButton = useSelector((store) => store.gpt.showGptSearch);

  useNowPlayingMovies();
  usePopulerMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  return (
    <div>
      <Header />
      {showGptButton ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
