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
      ". Only give me names of five movies, comma separated like the example result given ahead. Example result: Gadar, Sholay, Don, Bazigar, Golmal";

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
    <div className="pt-[13%]">
      <form
        className="bg-black w-1/2 mx-auto "
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          className="p-4 m-4 w-96 "
          type="text"
          placeholder={language[languageKey]?.searchPlaceholderValue}
        />
        <button
          className="bg-red-600 outline-none px-2 py-1 text-white"
          onClick={handleGptSearch}
        >
          {language[languageKey]?.search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
