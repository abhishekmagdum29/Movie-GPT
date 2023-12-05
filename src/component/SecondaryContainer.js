import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <div className=" bg-gray-950">
      <div className="relative z-10 -mt-5 md:-mt-44 ">
        <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies} />
        <MovieList title={"Populer"} movies={movies?.populerMovies} />
        <MovieList title={"Top-Rated"} movies={movies?.topRatedMovies} />
        <MovieList title={"Upcoming"} movies={movies?.upComingMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
