export const API_KEY = "a3ed32818ca34bc787c9412687c775ec";

export const API_TOKENS = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhM2VkMzI4MThjYTM0YmM3ODdjOTQxMjY4N2M3NzVlYyIsInN1YiI6IjY2MjNiNmUwMmUyYjJjMDE4NzY2Mjc2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Hbb-X7UJlhugsUSR6FjHRX7lxpIldlrNL6JguZfzKcU"

export const API_Options =  {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:"Bearer " + process.env.REACT_APP_TMDB_KEY,
    }
  };

  export const SUPPORTED_LANGUAGES = [
    { identifier: "en", name: "English" },
    { identifier: "hindi", name: "Hindi" },
    { identifier: "spanish", name: "Spanish" },
  ];

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";

export const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY;

export const GEMINI_KEY = process.env.REACT_APP_GEMINI_KEY;