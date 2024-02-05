import React from "react";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { toggleMovieTrailerComp } from "../utils/redux/moviesSlice";

const MovieTrailer = () => {
  const trailerData = useSelector((store) => store?.movies?.newMovieTrailer);

  const dispatch = useDispatch();

  console.log(trailerData);

  return (
    <div className="w-[1125px] h-[620px] py-2 absolute -top-10 left-[15%] z-10 bg-black">
      <div
        className="w-[28px] h-[28px] mx-auto  transition  hover:bg-gray-400 hover:cursor-pointer  flex items-center justify-center rounded-full duration-300"
        onClick={() => dispatch(toggleMovieTrailerComp())}
      >
        <RxCross2 className="text-xl" />
      </div>
      <iframe
        className="w-full h-full "
        src={
          "https://www.youtube.com/embed/" +
          trailerData[0]?.key +
          "?&autoplay=1&mute=1"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default MovieTrailer;
