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


    SaveReels: builder.mutation({
      query:(reelId)=>({
        url:"/save",
        method:"POST",
        body:{reelId}
      })
    }),

    GetSaveReels: builder.query({
      query: () => ({
        url: "/saved",
        method: "GET",
      }),
    }),

    LikeReels: builder.mutation({
      query:(reelId)=>({
        url:"/like",
        method:"POST",
        body:{reelId}
      })
    }),



  })
});

export const { useGetReelsQuery, useCreateReelMutation,useSaveReelsMutation,useGetSaveReelsQuery,useLikeReelMutation } = reelApi;