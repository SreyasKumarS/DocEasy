import { apiSlice } from '../apliSlice';  
const patientUrl='api/patients'

export const patientApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerPatient: builder.mutation<void, { name: string; email: string; password: string }>({
      query: (payload) => ({
        url: `${patientUrl}/register`,  
        method: 'POST',
        body: payload,
      }),
    }),
    verifyOtp: builder.mutation<void, { email: string; otp: string }>({
      query: ({ email, otp }) => ({
        url: `${patientUrl}/verify-otp`,
        method: 'POST',
        body: { email, otp },
      }),
    }),
    resendOtp: builder.mutation<void, string>({
      query: (email) => ({
        url: `${patientUrl}/resend-otp`,
        method: 'POST',
        body: { email },
      }),
    }),
    loginPatient: builder.mutation<{ token: string; patient: any }, { email: string; password: string }>({
      query: (payload) => ({
        url: `${patientUrl}/login`, 
        method: 'POST',
        body: payload,
      }),
    }),
    logoutPatient: builder.mutation<void, void>({
      query: () => ({
        url: `${patientUrl}/logout`, 
        method: 'POST',
      }),
    }),
    sendResetOtp: builder.mutation<void, string>({
      query: (email) => {
        console.log('Resending OTP for email:', email);
        return {
          url: `${patientUrl}/sendResetOtp`,
          method: 'POST',
          body: { email }, 
        };
      },
    }),
    resetPassword: builder.mutation<void, { email: string; newPassword: string; confirmPassword: string }>({
      query: ({ email, newPassword, confirmPassword }) => ({
        url: `${patientUrl}/resetPassword`,  
        method: 'POST',
        body: { email, newPassword, confirmPassword }, 
      }),
    }),
    
  }),
});



export const { 
useRegisterPatientMutation,
useVerifyOtpMutation, 
useResendOtpMutation,
useLoginPatientMutation,
useLogoutPatientMutation,
useSendResetOtpMutation,
useResetPasswordMutation,

} = patientApi;
