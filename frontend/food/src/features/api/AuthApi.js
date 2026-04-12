import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserLogin } from "../AuthSlice";

 const baseUrl = "https://social-media-web-wqqx.onrender.com/api/auth";
//const baseUrl="http://localhost:3000/api/auth"

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl, credentials: "include" }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (inputData) => ({
        url: "/login",
        method: "POST",
        body: inputData,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(UserLogin(result.data));
        } catch (error) {
          console.log("Login failed:", error);
        }
      },
    }),

    register: builder.mutation({
      query: (inputData) => ({
        url: "/register",
        method: "POST",
        body: inputData,
      }),
    }),

    getProfile: builder.query({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
      refetchOnMountOrArgChange: true,
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "GET",
      }),
    }),



    



  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useLogoutMutation,
} = authApi;
