import { apiSlice } from "./apiSlice";
import { SUBSCRIPTION_PLAN_URL } from "../utils/constants";

export const subscriptionPlanApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getsubscrptionPlan: builder.query({
      query: (data) => ({
        url: `${SUBSCRIPTION_PLAN_URL}/all`,
        method: "GET",
        body: data,
      }),
    }),
  }),
});

export const { useGetsubscrptionPlanQuery } = subscriptionPlanApiSlice;
