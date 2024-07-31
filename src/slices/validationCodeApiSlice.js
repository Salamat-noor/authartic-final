import { apiSlice } from './apiSlice';
import { VALIDATION_CODE_URL } from '../utils/constants';

export const validationCodeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getValidationCodeByCode: builder.mutation({
      query: (validCode) => ({
        url: `${VALIDATION_CODE_URL}/code/${validCode}`,
        method: 'POST',
        // Optionally, you can pass a body if needed
        body: {},
      }),
    }),
  }),
});

export const { useGetValidationCodeByCodeMutation } = validationCodeApiSlice;
