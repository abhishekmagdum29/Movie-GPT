import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className="w-52 px-4">
      <img
        className="object-cover rounded-md border outline-none border-gray-800 cursor-pointer "
        src={IMG_CDN_URL + posterPath}
        alt="posterImg"
      />
    </div>
  );
};

export default MovieCard;
