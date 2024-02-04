import React from "react";
import { IMG_CDN_URL } from "../utils/constants";
import { FaStar } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";

const MovieInfoCard = ({ infoData }) => {
  if (!infoData) return null;
  console.log(infoData);
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

  const playMovieTrailer = () => {};

  return (
    <div className="absolute  top-[12%]  bg-gray-950   text-white w-[100%] py-6 flex">
      <div className="w-[300px] h-[450px] ml-[7%] cursor-pointer">
        <img
          className="object-cover rounded-md"
          src={IMG_CDN_URL + poster_path}
          alt="img"
        />
      </div>

      <div className=" ml-[4%]  w-[65%]">
        <p className="text-4xl font-semibold tracking-wider">
          {original_title}
        </p>
        <div className="flex items-center  mt-3">
          <p className="text-lg mr-2 text-gray-300">{release_date}</p>
          {genres.map((genere) => (
            <p
              className="mx-3 font-medium text-lg text-gray-300"
              key={genere.name}
            >
              {genere.name} •
            </p>
          ))}
        </div>

        <div className="mt-5 flex items-center">
          <p className="text-xl text-gray-300  italic tracking-wider font-semibold">
            {tagline}
          </p>

          <div
            className="ml-10 flex items-center cursor-pointer hover:text-slate-300"
            onClick={playMovieTrailer}
          >
            <FaPlay className=" text-2xl  " />
            <p className="  text-xl text-gray-300 ml-2 ">Play Trailer</p>
          </div>
        </div>

        <p className="mt-10 text-xl text-gray-300 font-semibold  tracking-wider">
          Overview
        </p>
        <p className="mt-5 text-2xl text-gray-300 font-semibold tracking-wider">
          {overview}
        </p>
        <div className="flex justify-between  items-center w-[115px] mt-5">
          <FaStar className="text-4xl text-yellow-500" />
          <p className="text-3xl"> {Math.round(vote_average)}/10</p>
        </div>
      </div>
    </div>
  );
};

export default MovieInfoCard;
