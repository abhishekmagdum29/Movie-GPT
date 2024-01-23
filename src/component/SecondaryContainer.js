import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";
import language from "../utils/languageConstants";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  const languageKey = useSelector((store) => store.config.lang);

  return (
    <div className=" bg-gray-950">
      <div className="relative z-10 -mt-5 md:-mt-32 ">
        <MovieList
          title={language[languageKey]?.nowPlaying}
          movies={movies?.nowPlayingMovies}
        />
        <MovieList title={language[languageKey]?.popular} movies={movies?.populerMovies} />
        <MovieList title={language[languageKey]?.topRated} movies={movies?.topRatedMovies} />
        <MovieList title={language[languageKey]?.upcoming} movies={movies?.upComingMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
