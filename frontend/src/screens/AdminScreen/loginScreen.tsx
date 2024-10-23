import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../../components/patientComponents/FormContainer"; 
import { useLoginAdminMutation } from '../../slices/adminSlice/adminApiSlice'; 
import { setCredentials } from "../../slices/adminSlice/adminAuthSlice"; 
import { useDispatch,useSelector } from 'react-redux'; 
import { RootState } from '../../../store';

const AdminLoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginAdmin, { isLoading }] = useLoginAdminMutation(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const user = useSelector((state: RootState) => state.AdminAuth.user);

  // Redirect if already logged in (adminInfo/token exists)
  useEffect(() => {
    if (user) {
      navigate('/admin/adminHomeScreen');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 

    try {
      const result = await loginAdmin({ email, password }).unwrap();
      dispatch(setCredentials({
        admin: result.admin, // Ensure this is correctly structured in your API response
        token: result.token,  // Ensure the token is included in the response
    })); 
      console.log('Admin login successful, received token:', result.token);
      navigate('/admin/adminHomeScreen');
    } catch (error) {
      console.error('Login failed:', error); 
    }
  };

  return (
    <FormContainer>
      <h2>Admin Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Row className="py-3">
          <Col>
            <Link to="/admin/AdminForgotPasswordScreen">Forgot Password?</Link> 
          </Col>
        </Row>

        <Button type="submit" variant="primary" className="mt-3" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default AdminLoginScreen;
