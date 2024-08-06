import { apiSlice } from './apiSlice';
import { getTokenFromLocalStorage } from '@/utils/get-token';
import { VALIDATION_CODE_URL } from '../utils/constants';
import { CREATE_VAIDATION_CODE_URL } from '../utils/constants';

export const validationCodeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createValidationCode: builder.mutation({
      query: (numberOfCertificates) => ({
        url: `${CREATE_VAIDATION_CODE_URL}`,
        method: "POST",
        body: { no_Validation_code: numberOfCertificates },
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`
        }
      })
    }),
    getValidationCodeByCode: builder.mutation({
      query: (validCode) => ({
        url: `${VALIDATION_CODE_URL}/code/${validCode}`,
        method: 'POST',
        // Optionally, you can pass a body if needed
        body: {},
      }),
    }),

    getAvailableCodes: builder.query({
      query: () => ({
        url: `${CREATE_VAIDATION_CODE_URL}?page=1&limit=12&is_used=false`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`
        }
      }),
    }),

    getUsedValidationCodes: builder.query({
      query: () => ({
        url: `${CREATE_VAIDATION_CODE_URL}?page=1&limit=12&is_used=true`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`
        }
      }),
    }),

    getAllValidationCodes: builder.query({
      query: () => ({
        url: `${CREATE_VAIDATION_CODE_URL}?page=1&limit=12&is_used=false`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`
        }
      }),
    }),
  }),
});

export const { useCreateValidationCodeMutation, useGetValidationCodeByCodeMutation, useGetAllValidationCodesQuery, useGetAvailableCodesQuery, useGetUsedValidationCodesQuery } = validationCodeApiSlice;
