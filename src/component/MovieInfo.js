import React from "react";
import { useParams } from "react-router-dom";
import useMovieInfo from "../utils/customHooks/useMovieInfo";
import { useSelector } from "react-redux/es/hooks/useSelector";
import MovieInfoCard from "./MovieInfoCard";

const MovieInfo = () => {
  const { id } = useParams();
  useMovieInfo(id);

  const infoData = useSelector((store) => store?.movies);

  return (
    <div className="bg-[url('/assets/bg.jpg')] h-screen realtive">
      <div className="bg-black h-full opacity-[0.8] "></div>
      <MovieInfoCard infoData={infoData?.movieInfo} />
    </div>
  );
};

export default MovieInfo;
