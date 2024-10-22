import { apiSlice } from '../apliSlice';  

const adminUrl = 'api/admin';
export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    verifyOtpAdmin: builder.mutation<void, { email: string; otp: string }>({
      query: ({ email, otp }) => ({
        url: `${adminUrl}/verify-otpAdmin`,
        method: 'POST',
        body: { email, otp },
      }),
    }),
    resendOtpAdmin: builder.mutation<void, { email: string }>({
      query: ({ email }) => ({
        url: `${adminUrl}/resend-otp`,
        method: 'POST',
        body: { email },
      }),
    }),
    loginAdmin: builder.mutation<{ token: string; admin: any }, { email: string; password: string }>({
      query: (payload) => ({
        url: `${adminUrl}/login`,
        method: 'POST',
        body: payload,
      }),
    }),
    logoutAdmin: builder.mutation<void, void>({
      query: () => ({
        url: `${adminUrl}/logout`,
        method: 'POST',
      }),
    }),
    sendAdminResetOtp: builder.mutation<void, { email: string }>({
      query: ({ email }) => ({
        url: `${adminUrl}/sendResetAdminOtp`,
        method: 'POST',
        body: { email },
      }),
    }),
    resetAdminPassword: builder.mutation<void, { email: string; newPassword: string; confirmPassword: string }>({
      query: ({ email, newPassword, confirmPassword }) => ({
        url: `${adminUrl}/resetAdminPassword`,
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
  useResetAdminPasswordMutation 
} = adminApi;
