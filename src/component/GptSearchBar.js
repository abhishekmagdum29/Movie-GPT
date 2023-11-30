import React from "react";
import language from "../utils/languageConstants";
import { useSelector } from "react-redux";

const GptSearchBar = () => {
  const changeLang = useSelector((store) => store.config.lang);

  return (
    <div className="pt-[13%]">
      <form className="bg-black w-1/2 mx-auto ">
        <input
          className="p-4 m-4 w-96 "
          type="text"
          placeholder={language[changeLang]?.searchPlaceholderValue}
        />
        <button className="bg-red-600 outline-none px-2 py-1 text-white">
          {language[changeLang]?.search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
