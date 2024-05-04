import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_Options } from "../utils/constants";
import logo from "../assets/logo.png";
import MovieList from "./MovieList";

const Watch = () => {
  const [youtubeKey, setYoutubeKey] = useState("");
  const [recommendations, setRecommendations] = useState([]); // Initialize as an empty array
  const [error, setError] = useState(null);
  const { movieID } = useParams();

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieID}/videos?language=en-US`,
        API_Options
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const media = await response.json();
      const filterData = media.results.filter(
        (video) => video.type === "Featurette"
      );
      const teaser = filterData.length > 0 ? filterData[0] : media.results[0];

      if (!teaser || !teaser.key) {
        throw new Error("No teaser available");
      }

      setYoutubeKey(teaser.key);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load video");
    }
  };

  const getMovieSuggestions = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieID}/recommendations?language=en-US&page=1`,
        API_Options
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const media = await response.json();
      setRecommendations(media.results);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load recommendations");
    }
  };

  useEffect(() => {
    fetchData();
    getMovieSuggestions();
  }, [movieID]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <a href="/" className="absolute top-0 left-0 p-4 text-white z-50">
        <img className="w-44 mx-auto md:mx-0" src={logo} alt="logo" />
      </a>
      <div className=" md:h-screen w-screen">
        <iframe
          className="h-[416px] md:h-[calc(100%-0px)] w-full pt-[118px] md:pt-[70px]"
          src={`https://www.youtube.com/embed/${youtubeKey}?autoplay=1&mute=0&controls=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=0`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>

      <div className="p-4 m-4 bg-black text-white bg-opacity-90">
        <MovieList title="Recommendations" movies={recommendations} />
      </div>
    </>
  );
};

export default Watch;
