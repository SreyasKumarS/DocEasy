import { apiSlice } from '../apliSlice';  


const doctorUrl='api/doctor'
export const doctorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerDoctor: builder.mutation<void, { name: string; email: string; password: string; specialization:string; licenseNumber:string; }>({
      query: (payload) => ({
        url: `${doctorUrl}/register`,  // Adjust the URL path as necessary
        method: 'POST',
        body: payload,
      }),
    }),
    // Verify OTP
    verifyOtpDoctor: builder.mutation<void, { email: string; otp: string }>({
      query: ({ email, otp }) => ({
        url: `${doctorUrl}/verify-otpDoctor`,
        method: 'POST',
        body: { email, otp },
      }),
    }),
    
    // Resend OTP
    resendOtp: builder.mutation<void, { email: string }>({
      query: ({ email }) => ({
        url: `${doctorUrl}/resend-otp`,
        method: 'POST',
        body: { email },
      }),
    }),
    
    // Login doctor
    loginDoctor: builder.mutation<{ token: string; doctor: any }, { email: string; password: string }>({
      query: (payload) => ({
        url: `${doctorUrl}/loginDoctor`, 
        method: 'POST',
        body: payload,
      }),
    }),
    
    // Logout doctor
    logoutDoctor: builder.mutation<void, void>({
      query: () => ({
        url: `${doctorUrl}/logout`, 
        method: 'POST',
      }),
    }),
    
    // Send Reset OTP
    sendDoctorResetOtp: builder.mutation<void, { email: string }>({
      query: ({ email }) => ({
        url: `${doctorUrl}/sendResetDoctorOtp`,
        method: 'POST',
        body: { email },
      }),
    }),
    
    // Reset Password
    resetDoctorPassword: builder.mutation<void, { email: string; newPassword: string; confirmPassword: string }>({
      query: ({ email, newPassword, confirmPassword }) => ({
        url: `${doctorUrl}/resetDoctorPassword`,  
        method: 'POST',
        body: { email, newPassword, confirmPassword },
      }),
    }),
    
  }),
});

// Export hooks for each mutation
export const { 
  useRegisterDoctorMutation,
  useVerifyOtpDoctorMutation, 
  useResendOtpMutation,
  useLoginDoctorMutation,
  useLogoutDoctorMutation,
  useSendDoctorResetOtpMutation,
  useResetDoctorPasswordMutation,
} = doctorApi;
