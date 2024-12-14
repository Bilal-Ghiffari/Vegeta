import IBaseResponse from "@/types/response";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type TUserAuthForm = {
  name: string;
  email: string;
  password: string;
};

interface IAuthResponse extends IBaseResponse {
  data: TUserAuthForm;
}

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    register: builder.mutation<IAuthResponse, TUserAuthForm>({
      query: (body) => ({
        url: "/auth/sign-up",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation } = authApi;
