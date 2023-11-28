import React from "react";
import { BiSolidRightArrow } from "react-icons/bi";
import { IoIosInformationCircleOutline } from "react-icons/io";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className=" absolute w-screen aspect-video pt-[12%] px-12 text-white bg-gradient-to-r from-black ">
      <p className="text-4xl font-bold ">{title}</p>
      <p className="w-1/4 py-6 text-lg font-semibold">{overview}</p>

      <div className="flex">
        <button className="bg-white text-black w-[105px] px-2 py-2 rounded-md flex items-center justify-center hover:bg-opacity-80">
          <BiSolidRightArrow className="text-2xl text-black mr-1" />
          <p className="text-lg">Play </p>
        </button>

        <button className="bg-gray-500 text-white w-[150px] text-lg px-3 py-2 rounded-md ml-5 hover:bg-opacity-80 flex items-center justify-center">
          <IoIosInformationCircleOutline className="mr-2 text-2xl" />
          <p>More Info</p>
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
