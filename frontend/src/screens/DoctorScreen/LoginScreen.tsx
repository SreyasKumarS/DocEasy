import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../../components/patientComponents/FormContainer"; 
import { useLoginDoctorMutation } from '../../slices/doctorSlice/doctorApiSlice'; 
import { setCredentials } from "../../slices/doctorSlice/doctorAuthSlice"; 
import { useDispatch,useSelector } from 'react-redux'; 
import { toast } from "react-toastify";
import { RootState } from '../../../store'; 



const DoctorLoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginDoctor, { isLoading }] = useLoginDoctorMutation(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.DoctorAuth.user);

  useEffect(() => {
    if (user) {
      navigate('/doctor/DoctorHomeScreen');
    }
  }, [user, navigate])


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 

    try {
      const result = await loginDoctor({ email, password }).unwrap();
      dispatch(setCredentials(result));  
      navigate('/doctor/DoctorHomeScreen');
    } catch (error) {
      toast.error('Login failed'); 
    }
  };

  return (
    <FormContainer>
      <h2>Doctor Login</h2>
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
            <Link to="/doctor/DoctorForgotPasswordScreen">Forgot Password?</Link> 
          </Col>
        </Row>

        <Button type="submit" variant="primary" className="mt-3" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>

        <Row className="py-3">
          <Col>
            Don't have an account? <Link to="/doctor/register">Register</Link> 
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default DoctorLoginScreen;
