import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies) return null;

  return (
    <div className=" md:px-6 ">
      <h1 className="text-lg md:text-2xl py-4 ml-6  text-white">{title}</h1>
      <div className="flex  overflow-x-scroll p-2  ">
        {movies && (
          <div className=" flex">
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
