import { API_OPTIONS } from "../constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNewMovieTrailer } from "../redux/moviesSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";

const useNewMovieTrailer = (trailerId) => {
  const dispatch = useDispatch();

  const infoData = useSelector((store) => store?.movies);
  const trailerData = infoData.movieInfo;

  // fetch movie trailer videos & update the redux store with it
  const getNewMovieTrailer = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${trailerId}/videos?language=en-US`,
      API_OPTIONS
    );
    const data = await response.json();

    if (!data) return null;

    const filteredData = data?.results?.filter(
      (video) => video.type === "Trailer"
    );

    dispatch(addNewMovieTrailer(filteredData));
  };

  useEffect(() => {
    !trailerData && getNewMovieTrailer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useNewMovieTrailer;
