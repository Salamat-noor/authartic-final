import { apiSlice } from "./apiSlice";
import { CERTIFICATE_INFO_URL } from "../utils/constants";
import { getTokenFromLocalStorage } from "@/utils/get-token";

export const certificateInfoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyCertificateInfo: builder.query({
      query: (data) => ({
        url: `${CERTIFICATE_INFO_URL}`,
        method: "GET",
        body: data,
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`, // Replace with your function to get the token
        },
      }),
    }),
    postCertificateInfo: builder.mutation({
      query: (data) => ({
        url: `${CERTIFICATE_INFO_URL}`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      }),
    })
  }),
});

export const { useGetMyCertificateInfoQuery, usePostCertificateInfoMutation } = certificateInfoApiSlice;
