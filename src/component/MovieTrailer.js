import React from "react";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { toggleMovieTrailerComponent } from "../utils/redux/moviesSlice";

const MovieTrailer = () => {
  const trailerData = useSelector((store) => store?.movies?.newMovieTrailer);

  const dispatch = useDispatch();

  return (
    <div className="w-screen h-72 md:w-[100%] md:h-[620px] md:py-2 absolute -top-4 md:-top-12 z-10 bg-black">
      <div
        className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] mx-auto  transition  hover:bg-gray-400 hover:cursor-pointer  flex items-center justify-center rounded-full duration-300"
        onClick={() => dispatch(toggleMovieTrailerComponent())}
      >
        <RxCross2 className="text-base md:text-lg" />
      </div>
      <iframe
        className="w-full h-full md:w-[100%]  md:h-full "
        src={
          "https://www.youtube.com/embed/" +
          trailerData[0]?.key +
          "?&autoplay=1"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default MovieTrailer;
