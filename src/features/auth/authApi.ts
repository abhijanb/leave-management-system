import { baseApi } from "../shared/app/baseApi";
import type { UserRole } from "../shared/types";

interface LoginResponse {
  success: boolean;
  role: UserRole;
  name: string;
}

interface LoginRequest {
  email: string;
  password: string;
  remember?: boolean;
}

interface MeResponse {
  email: string;
  role: UserRole;
  name: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    getMe: builder.query<MeResponse, void>({
      query: () => "/auth/me",
    }),
  }),
});

export const { useLoginMutation, useGetMeQuery } = authApi;
