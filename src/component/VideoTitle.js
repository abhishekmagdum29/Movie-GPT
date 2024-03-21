import React from "react";
import { BiSolidRightArrow } from "react-icons/bi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import language from "../utils/languageConstants";
import { useSelector } from "react-redux";

const VideoTitle = ({ title, overview }) => {
  const languageKey = useSelector((store) => store.config.lang);

  return (
    <div className=" absolute w-screen aspect-video pt-[16%] md:pt-[10%] px-5 md:px-12 text-white bg-gradient-to-r from-black ">
      <p className="text-lg mt-12 md:text-4xl font-bold w-36 ">{title}</p>
      <p className="hidden md:block w-1/4 py-6 text-lg font-semibold">
        {overview.slice(0, 239)}
      </p>

      <div className="flex mt-3 md:mt-0">
        <button className="bg-white text-black md:w-[155px] px-2 py-1 rounded-md flex items-center justify-center hover:bg-opacity-90">
          <BiSolidRightArrow className="text-xs md:text-2xl text-black md:mr-3 mr-1" />
          <p className="text-xs md:text-lg">{language[languageKey]?.playBtn}</p>
        </button>

        <button className="bg-gray-500 text-white w-[180px] text-lg px-3 py-2 rounded-md ml-5 hover:bg-opacity-80 md:flex items-center justify-center hidden">
          <IoIosInformationCircleOutline className="md:mr-3 mr-2 text-2xl" />
          <p>{language[languageKey]?.moreInfo}</p>
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
