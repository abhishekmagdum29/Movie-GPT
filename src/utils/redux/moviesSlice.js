import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    populerMovies: null,
    topRatedMovies: null,
    upComingMovies: null,
    movieTrailer: [],
    movieInfo: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopulerMovies: (state, action) => {
      state.populerMovies = action.payload;
    },

    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },

    addUpcomingMovies: (state, action) => {
      state.upComingMovies = action.payload;
    },

    addMovieTrailer: (state, action) => {
      state.movieTrailer = action.payload;
    },

    addMovieInfoData: (state, action) => {
      state.movieInfo = action.payload;
    },

    changeMovieTrailer: (state, action) => {
      const { movie } = action.payload;
      state.newMovie = movie;
      state.stateValue = true;
    },
  },
});

export default movieSlice.reducer;

export const {
  addNowPlayingMovies,
  addPopulerMovies,
  addTopRatedMovies,
  addUpcomingMovies,
  addMovieTrailer,
  changeMovieTrailer,
  addMovieInfoData,
} = movieSlice.actions;
