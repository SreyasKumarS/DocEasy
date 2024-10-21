import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/patientComponents/Header";
import './App.css';

// Import ToastContainer from react-toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for Toastify

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />

      {/* ToastContainer to display toast notifications */}
      <ToastContainer 
        position="top-right" // You can adjust the position
        autoClose={3000} // Auto close after 3 seconds
        hideProgressBar={false} // Show progress bar
        newestOnTop={false} // Notifications stacking
        closeOnClick // Close on click
        rtl={false} // Left to right display
        pauseOnFocusLoss // Pause toast when window loses focus
        draggable // Allow dragging
        pauseOnHover // Pause on hover
        theme="colored" // Optional themes: colored, dark, light
      />
    </>
  );
}

export default App;
