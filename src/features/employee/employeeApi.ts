import { baseApi } from "../shared/app/baseApi";
import type { LeaveResponse, LeavesResponse } from "../manager/managerApi";
import type { LeaveStatus, LeaveType, SortBy, SortOrder } from "../shared/types";

interface StatsResponse {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  totalAllowed: number;
  used: number;
  available: number;
}

interface LeavesQuery {
  page?: number;
  limit?: number;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
  status?: LeaveStatus;
  type?: LeaveType;
}

export const employeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query<StatsResponse, void>({
      query: () => "/leaves/stats",
      providesTags: ["Stats"],
    }),
    getLeaves: builder.query<LeavesResponse, LeavesQuery>({
      query: ({ page = 1, limit = 10, sortBy, sortOrder, status, type }) => ({
        url: "/leaves/mine",
        params: {
          page,
          limit,
          ...(sortBy && { sortBy }),
          ...(sortOrder && { sortOrder }),
          ...(status && { status }),
          ...(type && { type }),
        },
      }),
      providesTags: ["Leaves"],
    }),
    deleteLeave: builder.mutation<void, number>({
      query: (id) => ({ url: `/leaves/${id}`, method: "DELETE" }),
      invalidatesTags: ["Leaves", "Stats"],
    }),
  }),
});

export const { useGetStatsQuery, useGetLeavesQuery, useDeleteLeaveMutation } = employeeApi;
