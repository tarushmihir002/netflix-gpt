import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    trailerVideo: null,
    popularMovies: null,
    TopRatedMovie: null,
    UpComingMovies: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },

    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },

    addTopRatedMovie: (state, action) => {
      state.TopRatedMovie = action.payload;
    },

    addUpComingMovies: (state, action) => {
      state.UpComingMovies = action.payload;
    },
  },
});

export const { addNowPlayingMovies, addTrailerVideo, addPopularMovies, addTopRatedMovie, addUpComingMovies } = moviesSlice.actions;

export default moviesSlice.reducer;