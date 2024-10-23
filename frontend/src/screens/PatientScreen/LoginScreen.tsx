import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../../components/patientComponents/FormContainer";
import { useLoginPatientMutation } from '../../slices/patientSlice/patientApiSlice'; 
import { setCredentials } from "../../slices/patientSlice/patientAuthSlice";
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from '../../../store'; 

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginPatient, { isLoading }] = useLoginPatientMutation(); 
  const navigate = useNavigate(); 
  const dispatch = useDispatch();


  const user = useSelector((state: RootState) => state.PatientAuth.user);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate])



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 

    try {
      const result = await loginPatient({ email, password }).unwrap(); 
      dispatch(setCredentials(result)); 
      navigate('/'); 
    } catch (error) {
      console.error('Login failed:', error); 
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

        <Row className="py-3">
          <Col>
            <Link to="/forgot-password">Forgot Password?</Link> 
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
