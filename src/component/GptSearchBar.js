import React, { useRef } from "react";
import language from "../utils/languageConstants";
import { useSelector, useDispatch } from "react-redux";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptSearchMovies } from "../utils/redux/gptSlice";

const GptSearchBar = () => {
  const languageKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const searchMovieTMDB = async (movie) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );

    const json = await response.json();

    return json.results;
  };

  const handleGptSearch = async () => {
    const gptQuery =
      "Act as movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". Only give me names of 5 movies, comma separated like the example result given ahead. Example result: Gadar, Sholay, Don, Bazigar, Golmal";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

    const tmdbMovieData = await Promise.all(promiseArray);

    dispatch(
      addGptSearchMovies({
        gptMovieNames: gptMovies,
        tmdbMovies: tmdbMovieData,
      })
    );
  };

  return (
    <div className=" pt-[42%] md:pt-[12%] ">
      <form
        className="bg-black mx-auto w-[90%] h-12 text-base md:w-1/2 md:h-16 md:text-lg flex rounded-lg  "
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          className=" w-96 h-full px-7 flex-1 outline-0  border-0 rounded-tl-lg rounded-bl-lg drop-shadow-2xl"
          type="text"
          placeholder={language[languageKey]?.searchPlaceholderValue}
        />
        <button
          className="bg-red-600  h-full outline-0  border-0 px-10 rounded-tr-lg rounded-br-lg  text-white"
          onClick={handleGptSearch}
        >
          {language[languageKey]?.search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
