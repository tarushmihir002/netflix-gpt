import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import GptSearch from "./GPTSearch";
import { useSelector } from "react-redux";
import Footer from "./Footer";
import useTopRatedMovie from "../hooks/useTopRatedMovie";
import useUpComingMovies from "../hooks/useUpComingMovies";
import ShimmerEffect from "./ShimmerEffect.js";
// import Spinner from "./Spinner.js";

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovie();
  useUpComingMovies();

  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  return (
    <div>
      <Header />
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          {movies?.length > 0 ? (
            <>
              <MainContainer />
              <SecondaryContainer />
              <Footer />
            </>
          ) : (
            <ShimmerEffect />
            // <Spinner/>
          )}
        </>
      )}
    </div>
  );
};

export default Browse;
