import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    gptMovieNames: null,
    tmdbMovies: null,
  },
  reducers: {
    toggleGptButton: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptSearchMovies: (state, action) => {
      const { gptMovieNames, tmdbMovies } = action.payload;
      state.gptMovieNames = gptMovieNames;
      state.tmdbMovies = tmdbMovies;
    },
  },
});

export default gptSlice.reducer;

export const { toggleGptButton, addGptSearchMovies } = gptSlice.actions;
