import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import BackgroundVideo from "./BackgroundVideo";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  // const movieData = useSelector((store) => store.movies);

  // const { newMovie, stateValue } = movieData;

  if (!movies) return null;

  // let mainMovie = stateValue === null ? movies[8] : newMovie;

  const mainMovie = movies[18];

  const { overview, original_title, id } = mainMovie;
console.log(id);
  return (
    <div className="pt-[30%] bg-black md:pt-0 ">
      <VideoTitle title={original_title} overview={overview} />
      <BackgroundVideo movieId={id} />
    </div>
  );
};

export default MainContainer;
