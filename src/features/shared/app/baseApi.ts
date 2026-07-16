import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "./env";

const { apiUrl } = env;

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: apiUrl,
        credentials: "include",
    }),
    tagTypes: ["Leaves", "Stats"],
    endpoints: () => ({}),
});