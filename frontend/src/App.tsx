import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/patientComponents/Header";
import Headerd from "./components/doctorComponent/Header";
import Headera from "./components/adminComponent/Header"; 
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const App: React.FC = () => {
  const location = useLocation(); 

  const isDoctorRoute = location.pathname.startsWith('/doctor');
  const isAdminRoute = location.pathname.startsWith('/admin'); 
  return (
    <>
      {isAdminRoute ? <Headera /> : isDoctorRoute ? <Headerd /> : <Header />}
      <Outlet />

      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="colored" 
      />
    </>
  );
}

export default App;
