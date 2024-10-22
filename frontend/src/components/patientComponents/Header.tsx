import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutPatientMutation } from '../../slices/patientSlice/patientApiSlice';
import { clearCredentials } from '../../slices/patientSlice/patientAuthSlice'; // Ensure correct import for clearing credentials
import { useNavigate } from 'react-router-dom'; // For redirecting user after logout if needed
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { RootState } from '../../../store'; // Import the RootState type

const Header = () => {
  const dispatch = useDispatch();
  const [logoutPatient] = useLogoutPatientMutation();
  const navigate = useNavigate();


  const isAuthenticated = useSelector((state: RootState) => state.PatientAuth.isAuthenticated);
  const user = useSelector((state: RootState) => state.PatientAuth.user);

  
  // Handle logout functionality
  const handleLogout = async () => {
    try {
      // Call the logout API endpoint
      await logoutPatient().unwrap();

      // Clear the credentials in Redux and localStorage
      dispatch(clearCredentials());

      // Optionally, navigate the user to the login page after logout
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: '#007bff',
        padding: '10px 50px',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div className="container-fluid">
        <a
          className="navbar-brand text-white"
          href="#"
          style={{
            fontSize: '1.5rem',
            fontWeight: '600',
          }}
        >
          DocEasy
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            {!isAuthenticated ? (
              <>
                {/* Show Login and Signup options when not authenticated */}
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-white"
                    href="#"
                    id="loginDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ fontSize: '1rem', fontWeight: '500', marginLeft: '30px' }}
                  >
                    Login
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="loginDropdown">
                    <li><a className="dropdown-item" href="/login/doctor">As Doctor</a></li>
                    <li><a className="dropdown-item" href="/login/patient">As Patient</a></li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-white"
                    href="#"
                    id="signupDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ fontSize: '1rem', fontWeight: '500', marginLeft: '30px' }}
                  >
                    Signup
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="register">
                    <li><a className="dropdown-item" href="/doctor/register">As Doctor</a></li>
                    <li><a className="dropdown-item" href="/register">As Patient</a></li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                {/* Show Patient's Name when authenticated */}
                <li className="nav-item">
                  <span className="nav-link text-white" style={{ fontSize: '1rem', fontWeight: '500', marginLeft: '30px' }}>
                    Hello, {user?.name || 'Patient'}
                  </span>
                </li>
                {/* Show Logout option when authenticated */}
                <li className="nav-item">
                  <a
                    className="nav-link text-white"
                    href="#"
                    onClick={handleLogout}
                    style={{ fontSize: '1rem', fontWeight: '500', marginLeft: '30px' }}
                  >
                    Logout
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
