import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../constants";
import { addNowPlayingMovies } from "../redux/moviesSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );

  const getNowPlayingMovies = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      API_OPTIONS
    );
    const data = await response.json();

    dispatch(addNowPlayingMovies(data.results));
  };

  useEffect(() => {
    !nowPlayingMovies && getNowPlayingMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useNowPlayingMovies;
