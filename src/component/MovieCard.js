import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;

  return (
    <div className="w-32 px-1 mx-[5px] md:w-[212px] md:px-4 md:mx-0 transition ease-in-out delay-150  hover:-translate-y-[10px]  duration-200  ">
      <img
        className="object-cover rounded-md border outline-none border-gray-800 cursor-pointer ease-in-out delay-100 hover:shadow-lg hover:shadow-blue-600 duration-200"
        src={IMG_CDN_URL + posterPath}
        alt="posterImg"
      />
    </div>
  );
};

export default MovieCard;
