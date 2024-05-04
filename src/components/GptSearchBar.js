import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { API_Options, GEMINI_KEY } from "../utils/constants";
import { addGptMovieResult } from "../redux/slices/gptSlice";
import openai from "../utils/openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const [loadingBtn, setLoadingBtn] = useState(false);
  const langKey = useSelector((store) => store.config.lang);
  const [error, setError] = useState(null); // State to hold error message
  const genAI = new GoogleGenerativeAI(GEMINI_KEY);
  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
        API_Options
      );
      if (!response.ok) {
        throw new Error("TMDB API request failed");
      }
      const json = await response.json();
      return json.results;
    } catch (error) {
      throw new Error(`Failed to search TMDB for '${movie}'`);
    }
  };

  // const handleGptSearchClick = async () => {
  //   const searchTextValue = searchText.current.value.trim();

  //   if (!searchTextValue) {
  //     setError("Please enter a valid movie query");
  //     return;
  //   }

  //   setError(null); // Reset error state before proceeding

  //   const gptQuery = `Act as a Movie Recommendation system and suggest some movies for the query: ${searchTextValue}. Only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya`;

  //   try {
  //     const gptResults = await openai.chat.completions.create({
  //       messages: [{ role: "user", content: gptQuery }],
  //       model: "gpt-3.5-turbo",
  //     });

  //     if (!gptResults.choices || !gptResults.choices[0]?.message?.content) {
  //       throw new Error("GPT response is invalid");
  //     }

  //     const gptMovies = gptResults.choices[0].message.content
  //       .split(",")
  //       .map((movie) => movie.trim());

  //     const tmdbResults = await Promise.all(
  //       gptMovies.map((movie) => searchMovieTMDB(movie))
  //     );

  //     dispatch(
  //       addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
  //     );
  //   }

  //   catch (error) {
  //     console.error("Error during movie search:", error.message);
  //     setError(" Movie recommendations powered by GPT are available on request due to paid APIs");
  //   }
  // };

  const handleGptSearchClick = async () => {
    setLoadingBtn(true);

    const searchTextValue = searchText.current.value.trim();

    if (!searchTextValue) {
      setError("Please enter a valid movie query");
      setLoadingBtn(false);
      return;
    }

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt =
        "Act as a movie recommendation system and suggest some movies for the query" +
        searchTextValue +
        ".only give me names of movies,comma separated like example result given ahead.Example result:Gadar,Sholay,Godzilla,Pathaan,3 Idiots.";
      const result = await model.generateContent(prompt);
      const gptResults = await result.response;
      const gptMovies =
        gptResults.candidates?.[0]?.content?.parts?.[0]?.text.split(",");

      setLoadingBtn(false);

      if (!gptMovies) {
        throw new Error("Failed to generate movie suggestions from GPT model.");
      }

      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);

      dispatch(
        addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
      );
    } catch (error) {
      // Handle errors
      console.error("An error occurred:", error.message);
      setError(
        " Movie recommendations powered by Gemini are unavailable on request due to paid APIs"
      );
      setLoadingBtn(false);
    }
  };

  return (
    <div className="">
      <div className="flex justify-center">
        <form
          className=" w-11/12 xl:w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/2 mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            ref={searchText}
            type="text"
            className="  xl:text-base lg:text-base md:text-sm sm:text-sm text-xs rounded-l-full font-normal text-black border-black xl:pl-5 md:pl-4 sm:pl-4 pl-3 lg:pl-5 xl:py-3 lg:py-3 md:py-2.5 sm:py-2 py-1.5 xl:w-9/12 md:w-10/12 w-9/12 sm:w-10/12 lg:w-9/12"
            placeholder={lang[langKey].gptSearchPlaceholder}
          />
          <button
            className="bg-red-700 xl:py-3  w-[24%] lg:py-3 md:py-4 sm:py-2 py-1.5 xl:px-8 sm:px-4 px-2 md:px-6 lg:px-8 font-semibold xl:text-base lg:text-base md:text-sm sm:text-sm text-xs  xl:w-3/12 md:w-2.5/12 sm:w-2/12 w-1.5/12 lg:w-3/12 rounded-r-full"
            onClick={handleGptSearchClick}
          >
            {loadingBtn ? (
              <div className="w-5 text-center ml-3 md:ml-12 h-5 border-t m border-gray-300 border-solid rounded-full animate-spin"></div>
            ) : (
              lang[langKey].search
            )}
          </button>
          {error && <p className="mt-2 text-sm  text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default GptSearchBar;
