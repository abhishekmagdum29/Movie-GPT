import { API_OPTIONS } from "../constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addMovieTrailer } from "../redux/moviesSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  // fetch movie trailer videos & update the redux store with it
  const getBackgroundMovieClip = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      API_OPTIONS
    );
    const data = await response.json();

    const filteredData = data.results.filter(
      (video) => video.type === "Trailer"
    );

    const trailer = filteredData.length ? filteredData[0] : data.results[0];

    dispatch(addMovieTrailer(trailer));
  };

  useEffect(() => {
    getBackgroundMovieClip();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useMovieTrailer;
