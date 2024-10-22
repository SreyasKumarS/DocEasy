import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../../components/patientComponents/FormContainer"; 
import { useLoginAdminMutation } from '../../slices/adminSlice/adminApiSlice'; 
import { setCredentials } from "../../slices/adminSlice/adminAuthSlice"; 
import { useDispatch } from 'react-redux'; 

const AdminLoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginAdmin, { isLoading }] = useLoginAdminMutation(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 

    try {
      const result = await loginAdmin({ email, password }).unwrap();
      dispatch(setCredentials(result));  
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
            <Link to="/admin/AdminForgotPasswordScreen">Forgot Password?</Link> {/* Adjust link */}
          </Col>
        </Row>

        <Button type="submit" variant="primary" className="mt-3" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>

        <Row className="py-3">
          <Col>
            Don't have an account? <Link to="/admin-register">Register</Link> {/* Adjust link */}
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default AdminLoginScreen;
