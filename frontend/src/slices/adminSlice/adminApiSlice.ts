import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    credentials: 'include', // This ensures cookies are sent with every request
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as { AdminAuth: { token: string | null } }).AdminAuth.token; 
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    
    verifyOtpAdmin: builder.mutation<void, { email: string; otp: string }>({
      query: ({ email, otp }) => ({
        url: '/admin/verify-otpAdmin',
        method: 'POST',
        body: { email, otp },
      }),
    }),
    resendOtpAdmin: builder.mutation<void, { email: string }>({
      query: ({ email }) => ({
        url: '/admin/resend-otp',
        method: 'POST',
        body: { email },
      }),
    }),
    loginAdmin: builder.mutation<{ token: string; admin: any }, { email: string; password: string }>({
      query: (payload) => ({
        url: '/admin/login',
        method: 'POST',
        body: payload,
      }),
    }),
    logoutAdmin: builder.mutation<void, void>({
      query: () => ({
        url: '/admin/logout',
        method: 'POST',
      }),
    }),
    sendAdminResetOtp: builder.mutation<void, { email: string }>({
      query: ({ email }) => ({
        url: '/admin/sendResetAdminOtp',
        method: 'POST',
        body: { email },
      }),
    }),
    resetAdminPassword: builder.mutation<void, { email: string; newPassword: string; confirmPassword: string }>({
      query: ({ email, newPassword, confirmPassword }) => ({
        url:'/admin/resetAdminPassword',
        method: 'POST',
        body: { email, newPassword, confirmPassword },
      }),
    }),
    

  }),
});

export const { 
  useVerifyOtpAdminMutation, 
  useResendOtpAdminMutation, 
  useLoginAdminMutation, 
  useLogoutAdminMutation, 
  useSendAdminResetOtpMutation, 
  useResetAdminPasswordMutation,
} = adminApi;
