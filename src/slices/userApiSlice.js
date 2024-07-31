import { apiSlice } from "./apiSlice";
import { AUTH_URL, USER_URL } from "../utils/constants";
import { getTokenFromLocalStorage } from "@/utils/get-token";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`, // Make sure AUTH_URL is correctly defined in constants
        method: "POST",
        body: data,
      }),
    }),
    getProfile: builder.query({
      query: (data) => ({
        url: `${USER_URL}/profile`,
        method: "GET",
        body: data,
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`, // Replace with your function to get the token
        },
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useGetProfileQuery, useRegisterMutation } =
  usersApiSlice;
