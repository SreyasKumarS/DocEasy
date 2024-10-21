import React from 'react'; // Import React
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider
import App from './App';
import HomeScreen from './screens/PatientScreen/HomeScreen';
import RegisterScreen from './screens/PatientScreen/RegisterScreen'; 
import LoginScreen from './screens/PatientScreen/LoginScreen';  
import ForgotPasswordScreen from './screens/PatientScreen/ForgotPasswordScreen'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import store from '../store'; // Import the Redux store
import ResetPasswordScreen from './screens/PatientScreen/ResetPasswordScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Routes */}
      <Route index element={<HomeScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/login" element={<LoginScreen />} /> 
      <Route path="/forgot-password" element={<ForgotPasswordScreen />} /> 
      <Route path="/resetPassword" element={<ResetPasswordScreen />} /> 
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
