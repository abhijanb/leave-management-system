import { baseApi } from "../shared/app/baseApi";
import type { LeaveResponse, LeavesResponse } from "../manager/managerApi";

interface StatsResponse {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

interface LeavesQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export const employeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query<StatsResponse, void>({
      query: () => "/leaves/stats",
      providesTags: ["Stats"],
    }),
    getLeaves: builder.query<LeavesResponse, LeavesQuery>({
      query: ({ page = 1, limit = 10, sortBy, sortOrder }) => ({
        url: "/leaves/mine",
        params: {
          page,
          limit,
          ...(sortBy && { sortBy }),
          ...(sortOrder && { sortOrder }),
        },
      }),
      providesTags: ["Leaves"],
    }),
  }),
});

export const { useGetStatsQuery, useGetLeavesQuery } = employeeApi;
