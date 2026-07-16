import { baseApi } from "../shared/app/baseApi";

interface LoginResponse {
  success: boolean;
}

interface LoginRequest {
  email: string;
  password: string;
  remember?: boolean;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/api/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
