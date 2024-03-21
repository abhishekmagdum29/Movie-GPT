import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    populerMovies: null,
    topRatedMovies: null,
    upComingMovies: null,
    movieTrailer: null,
    movieInfo: null,
    newMovieTrailer: null,
    showMovieTrailer: false,
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

    addNewMovieTrailer: (state, action) => {
      state.newMovieTrailer = action.payload;
    },
    toggleMovieTrailerComponent: (state) => {
      state.showMovieTrailer = !state.showMovieTrailer;
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
  addNewMovieTrailer,
  addMovieInfoData,
  toggleMovieTrailerComponent
} = movieSlice.actions;
