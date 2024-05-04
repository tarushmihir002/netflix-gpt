import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_Options } from "../utils/constants";
import { addTrailerVideo } from "../redux/slices/moviesSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);

  const getMovieVideos = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/" + movieId +"/videos?language=en-US",
        API_Options
      );


      if (!response.ok) {
        throw new Error("Failed to fetch movie videos");
      }

      const json = await response.json();

      if (!json.results || json.results.length === 0) {
        throw new Error("No video results found");
      }

      // Filter videos to get the first trailer, or the first available video
      const filterData = json.results.filter((video) => video.type === "Trailer");
      const trailer = filterData.length > 0 ? filterData[0] : json.results[0];

      dispatch(addTrailerVideo(trailer));
    } catch (error) {
      console.error("Error fetching movie videos:", error);
    }
  };

  useEffect(() => {
    !trailerVideo && getMovieVideos();
  }, []);

  return trailerVideo; 
};

export default useMovieTrailer;
