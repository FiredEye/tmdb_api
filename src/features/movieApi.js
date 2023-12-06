import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./constant";

const api_key = import.meta.env.VITE_API_KEY;

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    movieByCategory: builder.query({
      query: ({ category, page }) => ({
        url: `movie/${category}`,
        params: {
          api_key,
          page,
        },
      }),
    }),
    getMovieDetail: builder.query({
      query: (query) => ({
        url: `movie/${query}`,
        params: {
          api_key,
        },
      }),
    }),
    getVideosByMovieId: builder.query({
      query: (query) => ({
        url: `movie/${query}/videos`,
        params: {
          api_key,
        },
      }),
    }),
    getCrewByMovieId: builder.query({
      query: (query) => ({
        url: `movie/${query}/credits`,
        params: {
          api_key,
        },
      }),
    }),

    movieBySearch: builder.query({
      query: ({ query, page }) => ({
        url: `search/movie`,
        params: {
          api_key,
          query,
          page,
        },
      }),
    }),
    movieByRecommendation: builder.query({
      query: (query) => ({
        url: `/movie/${query}/recommendations`,
        params: {
          api_key,
        },
      }),
    }),
    movieBySimilarity: builder.query({
      query: (query) => ({
        url: `/movie/${query}/similar`,
        params: {
          api_key,
        },
      }),
    }),
  }),
});
export const {
  useMovieByCategoryQuery,
  useGetMovieDetailQuery,
  useGetVideosByMovieIdQuery,
  useGetCrewByMovieIdQuery,
  useMovieBySearchQuery,
  useMovieByRecommendationQuery,
  useMovieBySimilarityQuery,
} = movieApi;
