import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


  //const baseUrl = "https://social-media-web-wqqx.onrender.com/api/auth/reel";
   const baseUrl="http://localhost:3000/api/auth/reel"



export const reelApi = createApi({
  reducerPath: "reelApi",
  baseQuery: fetchBaseQuery({ baseUrl, credentials: "include" }),
  tagTypes: ["Reels", "SavedReels"],
  endpoints: (builder) => ({
    getReels: builder.query({
      query: () => ({
        url: "/data",
        method: "GET",
      }),
      providesTags: (result) =>
        result?.reelItems
          ? [
              ...result.reelItems.map(({ _id }) => ({ type: "Reels", id: _id })),
              { type: "Reels", id: "LIST" },
            ]
          : [{ type: "Reels", id: "LIST" }],
    }),


    getReelsByUser: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: (result) =>
        result?.reelItems
          ? [
              ...result.reelItems.map(({ _id }) => ({ type: "Reels", id: _id })),
              { type: "Reels", id: "LIST" },
            ]
          : [{ type: "Reels", id: "LIST" }],
      refetchOnMountOrArgChange: true,
    }),


    CreateReel: builder.mutation({
      query: (inputData) => ({
        url: "/create", 
        method: "POST",
        body: inputData,
      }),
    }),


    SaveReels: builder.mutation({
      query: (reelId) => ({
        url: "/save",
        method: "POST",
        body: { reelId },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Reels", id: arg },
        { type: "Reels", id: "LIST" },
        { type: "SavedReels", id: arg },
        { type: "SavedReels", id: "LIST" },
      ],
    }),

    GetSaveReels: builder.query({
      query: () => ({
        url: "/save",
        method: "GET",
      }),
      providesTags: (result) =>
        result?.savedReels
          ? [
              ...result.savedReels.map(({ reel }) => ({ type: "SavedReels", id: reel._id })),
              { type: "SavedReels", id: "LIST" },
            ]
          : [{ type: "SavedReels", id: "LIST" }],
      refetchOnMountOrArgChange: true,
    }),

    LikeReels: builder.mutation({
      query: (reelId) => ({
        url: "/like",
        method: "POST",
        body: { reelId },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Reels", id: arg },
        { type: "Reels", id: "LIST" },
      ],
    }),



  })
});

export const { useGetReelsQuery,useLikeReelsMutation,useGetReelsByUserQuery,useCreateReelMutation,useSaveReelsMutation,useGetSaveReelsQuery, } = reelApi;