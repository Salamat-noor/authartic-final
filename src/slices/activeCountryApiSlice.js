import { apiSlice } from "./apiSlice";
import { COUNTRY_URL } from "../utils/constants";

export const activeCountryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getActiveCountries: builder.query({
      query: (data) => ({
        url: `${COUNTRY_URL}/status/active`,
        method: "GET",
        body: data,
      }),
    }),
  }),
});

export const { useGetActiveCountriesQuery } = activeCountryApiSlice;
