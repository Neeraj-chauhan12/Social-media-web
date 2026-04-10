import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserLogin } from "../AuthSlice";

const baseUrl = "http://localhost:3000/api/auth";

export const AuthApi = createApi({
  reducerPath: "AuthApi",
  baseQuery: fetchBaseQuery({ baseUrl, credentials: "include" }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (inputData) => ({
        url: "/user/login",
        method: "POST",
        body: inputData,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(UserLogin(result.data));
          console.log("Login successful:", result.data);
        } catch (error) {
          console.log("Login failed:", error);
        }
      },
    }),

    register:builder.mutation({
        query:(inputData)=>({
            url:"/user/register",
            method:"POST",
            body:inputData
        })

    }),


    getProfile:builder.query({
        query:()=>({
            url:"/user/profile",
            method:"GET"
        })
    })



  }),
});


export const { useLoginMutation, useRegisterMutation, useGetProfileQuery } = AuthApi;