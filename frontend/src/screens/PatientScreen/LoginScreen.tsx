import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../../components/patientComponents/FormContainer";
import { useLoginPatientMutation } from '../../slices/patientSlice/patientApiSlice'; // Import the login hook
import { setCredentials } from "../../slices/patientSlice/patientAuthSlice";
import { useDispatch } from 'react-redux'; // Import useDispatch to dispatch actions

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginPatient, { isLoading }] = useLoginPatientMutation(); // Use the login hook
  const navigate = useNavigate(); // For navigation after successful login
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const result = await loginPatient({ email, password }).unwrap(); // Call the login API
      dispatch(setCredentials(result)); 
      console.log('Login successful, received token:', result.token);

      navigate('/'); // Adjust the route as necessary
    } catch (error) {
      console.error('Login failed:', error); // Handle the error appropriately
    }
  };

  return (
    <FormContainer>
      <h2>Login</h2>
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

        {/* Forgot Password Link */}
        <Row className="py-3">
          <Col>
            <Link to="/forgot-password">Forgot Password?</Link> {/* Add this link */}
          </Col>
        </Row>

        <Button type="submit" variant="primary" className="mt-3" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>

        <Row className="py-3">
          <Col>
            Don't have an account? <Link to="/register">Register</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;
