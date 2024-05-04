import { useEffect } from "react";
import { useDispatch ,  useSelector} from "react-redux";
import { API_Options} from "../utils/constants";
import { addTopRatedMovie } from "../redux/slices/moviesSlice";

const  useTopRatedMovie = () => {
  // Fetch Data from TMDB API and update store
  const dispatch = useDispatch();
  const RatedMovie = useSelector((store) => store.movies.popularMovies);

  const getTopRatedMovie = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?page=1",
      API_Options
    );
    const json = await data.json();
    dispatch(addTopRatedMovie(json.results));
  };

  useEffect(() => {
    !RatedMovie && getTopRatedMovie(); // achieving memoization
  }, []);
};

export default useTopRatedMovie;
