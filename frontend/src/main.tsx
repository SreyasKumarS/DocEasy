import React from 'react'; 
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux'; 
import App from './App';

import HomeScreen from './screens/PatientScreen/HomeScreen';
import RegisterScreen from './screens/PatientScreen/RegisterScreen'; 
import LoginScreen from './screens/PatientScreen/LoginScreen';  
import ForgotPasswordScreen from './screens/PatientScreen/ForgotPasswordScreen'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import store from '../store';
import ResetPasswordScreen from './screens/PatientScreen/ResetPasswordScreen';

import DoctorHomeScreen from './screens/DoctorScreen/HomeScreen'; 
import DoctorRegisterScreen from './screens/DoctorScreen/RegisterScreen';
import DoctorLoginScreen from './screens/DoctorScreen/LoginScreen';
import DoctorForgotPasswordScreen from './screens/DoctorScreen/ForgotPassword';
import ResetDoctorPasswordWithOtpScreen from './screens/DoctorScreen/ResetPassword';


import AdminHomeScreen from './screens/AdminScreen/homeScreen'; 
import AdminLoginScreen from './screens/AdminScreen/loginScreen';
import AdminForgotPasswordScreen from './screens/AdminScreen/forgotPassword';
import AdminResetPasswordScreen from './screens/AdminScreen/resetPassword';
import DoctorApprovals from './screens/AdminScreen/doctorApprovalScreen';
import PatientListings from './screens/AdminScreen/patientListingScreen'
import DoctorListings from './screens/AdminScreen/doctorListingScreen'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Patient Routes */}
      <Route index element={<HomeScreen />} />

      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/login" element={<LoginScreen />} /> 
      <Route path="/forgot-password" element={<ForgotPasswordScreen />} /> 
      <Route path="/resetPassword" element={<ResetPasswordScreen />} /> 

      {/* Doctor Routes */}
      <Route path="doctor">
      <Route path="register" element={<DoctorRegisterScreen />} /> 
      <Route path="login" element={<DoctorLoginScreen />} />
      <Route path="DoctorHomeScreen" element={<DoctorHomeScreen />} />
      <Route path="DoctorForgotPasswordScreen" element={<DoctorForgotPasswordScreen />} />
      <Route path="resetpassword" element={<ResetDoctorPasswordWithOtpScreen />} />

      </Route>


       {/* Admin Routes */}
      <Route path="admin"> 
      <Route path="login" element={<AdminLoginScreen/>} />
      <Route path="adminHomeScreen" element={<AdminHomeScreen />} />
      <Route path="adminForgotPasswordScreen" element={<AdminForgotPasswordScreen />} />
      <Route path="adminResetPasswordScreen" element={<AdminResetPasswordScreen />} />
      <Route path="DoctorApprovalScreen" element={<DoctorApprovals />} />
      <Route path="patientListingScreen" element={<PatientListings />} />
      <Route path="doctorListingScreen" element={<DoctorListings />} />
      </Route>

    </Route>
  )
);




const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <Provider store={store}> {/* Wrap with Provider */}
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
