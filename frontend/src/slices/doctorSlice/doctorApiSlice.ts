import { apiSlice } from '../apliSlice';  


const doctorUrl='api/doctor'
export const doctorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerDoctor: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: `${doctorUrl}/register`,  
        method: 'POST',
        body: formData,  
      }),
    }),
    verifyOtpDoctor: builder.mutation<void, { email: string; otp: string }>({
      query: ({ email, otp }) => ({
        url: `${doctorUrl}/verify-otpDoctor`,
        method: 'POST',
        body: { email, otp },
      }),
    }),
    resendOtp: builder.mutation<void, string>({
      query: (email) => ({
        url: `${doctorUrl}/resend-otp`,
        method: 'POST',
        body: { email },
      }),
    }),
    
    loginDoctor: builder.mutation<{ token: string; doctor: any }, { email: string; password: string }>({
      query: (payload) => ({
        url: `${doctorUrl}/loginDoctor`, 
        method: 'POST',
        body: payload,
      }),
    }),
    logoutDoctor: builder.mutation<void, void>({
      query: () => ({
        url: `${doctorUrl}/logout`, 
        method: 'POST',
      }),
    }),
    sendDoctorResetOtp: builder.mutation<void, { email: string }>({
      query: ({ email }) => ({
        url: `${doctorUrl}/sendResetDoctorOtp`,
        method: 'POST',
        body: { email },
      }),
    }),
    resetDoctorPassword: builder.mutation<void, { email: string; newPassword: string; confirmPassword: string }>({
      query: ({ email, newPassword, confirmPassword }) => ({
        url: `${doctorUrl}/resetDoctorPassword`,  
        method: 'POST',
        body: { email, newPassword, confirmPassword },
      }),
    }),
    
  }),
});

export const { 
  useRegisterDoctorMutation,
  useVerifyOtpDoctorMutation, 
  useResendOtpMutation,
  useLoginDoctorMutation,
  useLogoutDoctorMutation,
  useSendDoctorResetOtpMutation,
  useResetDoctorPasswordMutation,
} = doctorApi;
