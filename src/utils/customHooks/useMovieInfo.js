import { useEffect } from "react";
import { API_OPTIONS } from "../constants";
import { useDispatch } from "react-redux";
import { addMovieInfoData } from "../redux/moviesSlice";

const useMovieInfo = (id) => {
  const dispatch = useDispatch();

  const getMovieInfo = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      API_OPTIONS
    );

    const data = await response.json();

    dispatch(addMovieInfoData(data));
  };

  useEffect(() => {
    getMovieInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useMovieInfo;
