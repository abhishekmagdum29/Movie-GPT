import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const gptStoreData = useSelector((store) => store.gpt);
  const { gptMovieNames, tmdbMovies } = gptStoreData;

  if (!gptMovieNames) return null;

  return (
    <div className="p-4 mt-16 mx-4 bg-black text-white bg-opacity-80">
      <div>
        {gptMovieNames.map((movieName, i) => (
          <MovieList key={movieName} title={movieName} movies={tmdbMovies[i]} />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
