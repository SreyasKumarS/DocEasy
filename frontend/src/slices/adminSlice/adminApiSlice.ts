// import { apiSlice } from '../apliSlice';  

// const adminUrl = 'api/admin';
// export const adminApi = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     verifyOtpAdmin: builder.mutation<void, { email: string; otp: string }>({
//       query: ({ email, otp }) => ({
//         url: `${adminUrl}/verify-otpAdmin`,
//         method: 'POST',
//         body: { email, otp },
//       }),
//     }),
//     resendOtpAdmin: builder.mutation<void, { email: string }>({
//       query: ({ email }) => ({
//         url: `${adminUrl}/resend-otp`,
//         method: 'POST',
//         body: { email },
//       }),
//     }),
//     loginAdmin: builder.mutation<{ token: string; admin: any }, { email: string; password: string }>({
//       query: (payload) => ({
//         url: `${adminUrl}/login`,
//         method: 'POST',
//         body: payload,
//       }),
//     }),
//     logoutAdmin: builder.mutation<void, void>({
//       query: () => ({
//         url: `${adminUrl}/logout`,
//         method: 'POST',
//       }),
//     }),
//     sendAdminResetOtp: builder.mutation<void, { email: string }>({
//       query: ({ email }) => ({
//         url: `${adminUrl}/sendResetAdminOtp`,
//         method: 'POST',
//         body: { email },
//       }),
//     }),
//     resetAdminPassword: builder.mutation<void, { email: string; newPassword: string; confirmPassword: string }>({
//       query: ({ email, newPassword, confirmPassword }) => ({
//         url: `${adminUrl}/resetAdminPassword`,
//         method: 'POST',
//         body: { email, newPassword, confirmPassword },
//       }),
//     }),
//   }),
// });


// export const { 
//   useVerifyOtpAdminMutation, 
//   useResendOtpAdminMutation, 
//   useLoginAdminMutation, 
//   useLogoutAdminMutation, 
//   useSendAdminResetOtpMutation, 
//   useResetAdminPasswordMutation 
// } = adminApi;


import { apiSlice } from '../apliSlice';  

// Define the Doctor interface
interface Doctor {
  _id: string;
  name: string;
  email: string;
  licenseNumber: string;
  medicalLicense: string;
  isApproved: boolean;
  specialization: string;
}

const adminUrl = 'api/admin';


export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Existing admin-related mutations
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
    
    // New doctor-related endpoints

    // Fetch unapproved doctors
    // fetchUnapprovedDoctors: builder.query<Doctor[], void>({
    //   query: () => ({
    //     url: `${adminUrl}/unapproved`,
    //     method: 'GET',
    //   }),
    // }),

    // // Approve a doctor
    // approveDoctor: builder.mutation<void, string>({
    //   query: (doctorId) => ({
    //     url: `${adminUrl}/approve/${doctorId}`,
    //     method: 'PUT',
    //   }),
    // }),

    // // Reject a doctor
    // rejectDoctor: builder.mutation<void, string>({
    //   query: (doctorId) => ({
    //     url: `${adminUrl}/${doctorId}`,
    //     method: 'DELETE',
    //   }),
    // }),

  }),
});

// Export the hooks to be used in components
export const { 
  useVerifyOtpAdminMutation, 
  useResendOtpAdminMutation, 
  useLoginAdminMutation, 
  useLogoutAdminMutation, 
  useSendAdminResetOtpMutation, 
  useResetAdminPasswordMutation,
} = adminApi;
