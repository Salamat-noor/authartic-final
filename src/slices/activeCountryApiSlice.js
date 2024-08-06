import { apiSlice } from "./apiSlice";
import { COUNTRY_URL } from "../utils/constants";
import { ADMIN_COUNTRIES_URL } from "../utils/constants";
import { getTokenFromLocalStorage } from "@/utils/get-token";

export const activeCountryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getActiveCountries: builder.query({
      query: (data) => ({
        url: `${COUNTRY_URL}/status/active`,
        method: "GET",
        body: data,
      }),
    }),
    findAllCountries: builder.query({
      query: ({ page, limit, isActiveCountry }) => ({
        url: `${ADMIN_COUNTRIES_URL}?page=${page}&limit=${limit}&is_active=${isActiveCountry}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`
        }
      }),
    }),

  }),
});

export const { useGetActiveCountriesQuery, useFindAllCountriesQuery } = activeCountryApiSlice;
