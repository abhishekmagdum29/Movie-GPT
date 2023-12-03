import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../constants";
import { addPopulerMovies } from "../redux/moviesSlice";

const usePopulerMovies = () => {
  const dispatch = useDispatch();
  const populerMovies = useSelector((store) => store.movies.populerMovies);

  const getPopulerMovies = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?page=1",
      API_OPTIONS
    );
    const data = await response.json();

    dispatch(addPopulerMovies(data.results));
  };

  useEffect(() => {
    !populerMovies && getPopulerMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default usePopulerMovies;
