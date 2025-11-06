import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { base_url } from "../../../server";
const baseUrl = base_url();
export const bannerApi = createApi({
  reducerPath: "bannerApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}` }),
  endpoints: (builder) => ({
    getBanner: builder.query({
      query: () => ({
        url: "banner",
        method: "GET",
      }),
    }),
  }),
});
export const { useGetBannerQuery } = bannerApi;
