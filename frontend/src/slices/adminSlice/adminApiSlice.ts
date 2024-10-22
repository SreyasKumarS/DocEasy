import { apiSlice } from '../apliSlice';  

const adminUrl = 'api/admin';
export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Verify OTP
    verifyOtpAdmin: builder.mutation<void, { email: string; otp: string }>({
      query: ({ email, otp }) => ({
        url: `${adminUrl}/verify-otpAdmin`,
        method: 'POST',
        body: { email, otp },
      }),
    }),
    
    // Resend OTP
    resendOtpAdmin: builder.mutation<void, { email: string }>({
      query: ({ email }) => ({
        url: `${adminUrl}/resend-otp`,
        method: 'POST',
        body: { email },
      }),
    }),

    // Login admin
    loginAdmin: builder.mutation<{ token: string; admin: any }, { email: string; password: string }>({
      query: (payload) => ({
        url: `${adminUrl}/login`,
        method: 'POST',
        body: payload,
      }),
    }),

    // Logout admin
    logoutAdmin: builder.mutation<void, void>({
      query: () => ({
        url: `${adminUrl}/logout`,
        method: 'POST',
      }),
    }),

    // Send Reset OTP
    sendAdminResetOtp: builder.mutation<void, { email: string }>({
      query: ({ email }) => ({
        url: `${adminUrl}/sendResetAdminOtp`,
        method: 'POST',
        body: { email },
      }),
    }),

    // Reset Password
    resetAdminPassword: builder.mutation<void, { email: string; newPassword: string; confirmPassword: string }>({
      query: ({ email, newPassword, confirmPassword }) => ({
        url: `${adminUrl}/resetAdminPassword`,
        method: 'POST',
        body: { email, newPassword, confirmPassword },
      }),
    }),
  }),
});

// Export hooks for each mutation
export const { 
  useVerifyOtpAdminMutation, 
  useResendOtpAdminMutation, 
  useLoginAdminMutation, 
  useLogoutAdminMutation, 
  useSendAdminResetOtpMutation, 
  useResetAdminPasswordMutation 
} = adminApi;
