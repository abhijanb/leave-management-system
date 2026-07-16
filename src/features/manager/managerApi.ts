import { baseApi } from "../shared/app/baseApi";

export interface LeaveUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface LeaveResponse {
  id: number;
  userId: number;
  type: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: LeaveUser;
}

interface StatsResponse {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

export interface LeavesResponse {
  data: LeaveResponse[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  
}

interface LeavesQuery {
  page?: number;
  limit?: number;
  status?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export const managerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query<StatsResponse, void>({
      query: () => "/leaves/stats",
      providesTags: ["Stats"],
    }),
    getLeaves: builder.query<LeavesResponse, LeavesQuery>({
      query: ({ page = 1, limit = 10, status, sortBy, sortOrder }) => ({
        url: "/leaves",
        params: {
          page,
          limit,
          ...(status && { status }),
          ...(sortBy && { sortBy }),
          ...(sortOrder && { sortOrder }),
        },
      }),
      providesTags: ["Leaves"],
    }),
    approveLeave: builder.mutation<LeaveResponse, number>({
      query: (id) => ({
        url: `/leaves/${id}/approve`,
        method: "PATCH",
      }),
      invalidatesTags: ["Leaves", "Stats"],
    }),
    rejectLeave: builder.mutation<LeaveResponse, number>({
      query: (id) => ({
        url: `/leaves/${id}/reject`,
        method: "PATCH",
      }),
      invalidatesTags: ["Leaves", "Stats"],
    }),
  }),
});

export const { useGetStatsQuery, useGetLeavesQuery, useApproveLeaveMutation, useRejectLeaveMutation } = managerApi;
