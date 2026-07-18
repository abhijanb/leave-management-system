import { baseApi } from "../shared/app/baseApi";
import type { UserRole, LeaveStatus, LeaveType, SortBy, SortOrder } from "../shared/types";

export interface LeaveUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface EmployeesResponse {
  data: LeaveUser[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface EmployeesQuery {
  page?: number;
  limit?: number;
  search?: string;
}

export interface LeaveResponse {
  id: number;
  userId: number;
  type: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  status: LeaveStatus;
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
  status?: LeaveStatus;
  type?: LeaveType;
  employee?: string;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
}

export const managerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getManagerStats: builder.query<StatsResponse, void>({
      query: () => "/leaves/stats",
      providesTags: ["Stats"],
    }),
    getManagerLeaves: builder.query<LeavesResponse, LeavesQuery>({
      query: ({ page = 1, limit = 10, status, type, employee, sortBy, sortOrder }) => ({
        url: "/leaves",
        params: {
          page,
          limit,
          ...(status && { status }),
          ...(type && { type }),
          ...(employee && { employee }),
          ...(sortBy && { sortBy }),
          ...(sortOrder && { sortOrder }),
        },
      }),
      providesTags: ["Leaves"],
    }),
    getEmployees: builder.query<EmployeesResponse, EmployeesQuery>({
      query: ({ page = 1, limit = 10, search }) => ({
        url: "/users",
        params: {
          page,
          limit,
          ...(search && { search }),
        },
      }),
      providesTags: ["Employees"],
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

export const { useGetManagerStatsQuery, useGetManagerLeavesQuery, useGetEmployeesQuery, useApproveLeaveMutation, useRejectLeaveMutation } = managerApi;
