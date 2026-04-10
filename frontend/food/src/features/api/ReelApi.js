import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseUrl = "http://localhost:3000/api/auth/reel";

export const reelApi = createApi({
  reducerPath: "reelApi",
  baseQuery: fetchBaseQuery({ baseUrl, credentials: "include" }),
  endpoints: (builder) => ({
    getReels: builder.query({
      query: () => ({
        url: "/data",
        method: "GET",
      }),
    }),



    CreateReel: builder.mutation({
      query: (inputData) => ({
        url: "/create", 
        method: "POST",
        body: inputData,
      }),
    }),




  })
});

export const { useGetReelsQuery, useCreateReelMutation } = reelApi;