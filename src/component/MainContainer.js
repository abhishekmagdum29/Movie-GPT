import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import BackgroundVideo from "./BackgroundVideo";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies) return null;

  const mainMovie = movies[5];

  const { overview, original_title, id } = mainMovie;

  return (
    <div className="pt-[30%] bg-black md:pt-0">
      <VideoTitle title={original_title} overview={overview} />
      <BackgroundVideo movieId={id} />
    </div>
  );
};

export default MainContainer;
