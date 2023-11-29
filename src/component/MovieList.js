import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies) return null;

  return (
    <div className="px-6   ">
      <h1 className="text-2xl py-4 ml-6  text-white">{title}</h1>
      <div className=" flex overflow-x-hidden p-2 ">
        {movies && (
          <div className="flex">
            {movies.map((movie) => (
              <MovieCard key={movie.id} posterPath={movie?.poster_path} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieList;
