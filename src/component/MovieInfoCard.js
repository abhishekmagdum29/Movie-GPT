import React from "react";
import { API_OPTIONS, IMG_CDN_URL } from "../utils/constants";
import { FaStar } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addNewMovieTrailer } from "../utils/redux/moviesSlice";
import MovieTrailer from "./MovieTrailer";
import { useSelector } from "react-redux";
import { toggleMovieTrailerComp } from "../utils/redux/moviesSlice";

const MovieInfoCard = ({ infoData }) => {
  const showTrailer = useSelector((store) => store.movies.showMovieTrailer);

  const dispatch = useDispatch();

  if (!infoData) return null;
  const {
    original_title,
    tagline,
    overview,
    poster_path,
    vote_average,
    genres,
    release_date,
    id,
  } = infoData;

  const playMovieTrailer = async (id) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      API_OPTIONS
    );
    const data = await response.json();

    const filteredData = data?.results?.filter(
      (video) => video.type === "Trailer"
    );

    dispatch(addNewMovieTrailer(filteredData));

    dispatch(toggleMovieTrailerComp());
  };

  return (
    <>
      <div className="absolute  top-[13%]  bg-gray-950   text-white  md:w-[100%] py-6 flex">
        <div className="md:w-[300px] md:h-[450px] ml-2 md:ml-[7%] w-[150px] h-[250px] ">
          <img
            className="object-cover rounded-md"
            src={IMG_CDN_URL + poster_path}
            alt="img"
          />
        </div>

        <div className=" ml-[4%]  w-[65%]">
          <p className="text-xl md:text-4xl font-semibold tracking-wider">
            {original_title}
          </p>
          <div className="flex items-center  mt-3">
            <p className="text-[9px] md:text-lg mr-2 text-gray-300">
              {release_date}
            </p>
            {genres.map((genere) => (
              <p
                className="md:mx-3 mx-1 font-medium text-xs md:text-lg text-gray-300 underline decoration-1"
                key={genere.name}
              >
                {genere.name}
              </p>
            ))}
          </div>

          <div className="mt-5 flex items-center">
            <p className="text-xs mr-4 md:text-xl text-gray-300  md:italic tracking-wider font-semibold">
              {tagline.slice(0, 80)}
            </p>

            <div
              className=" md:ml-10 flex items-center cursor-pointer  transition hover:text-blue-400 duration-300"
              onClick={() => playMovieTrailer(id)}
            >
              <FaPlay className="text-base md:text-2xl" />
              <p className=" text-xs md:text-xl text-gray-300 ml-2  transition hover:text-blue-400 duration-300">
                Play Trailer
              </p>
            </div>
          </div>

          <p className="mt-4 md:mt-10 text-[10px] md:text-xl text-gray-300 font-semibold  md:tracking-wider">
            Overview
          </p>
          <p className="mt-2 md:mt-5 p-1 text-[10px] md:text-2xl text-gray-300 font-semibold md:tracking-wider">
            {overview}
          </p>
          <div className="flex md:justify-between  items-center w-[115px] mt-2 md:mt-5">
            <FaStar className="text-base mr-2 md:text-4xl text-yellow-500" />
            <p className="text-base md:text-3xl">{Math.round(vote_average)}/10</p>
          </div>
        </div>
        {showTrailer && <MovieTrailer />}
      </div>
    </>
  );
};

export default MovieInfoCard;
