import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../../components/patientComponents/FormContainer";
import { toast } from 'react-toastify';
import {
  useRegisterPatientMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
} from '../../slices/patientSlice/patientApiSlice';

const RegisterScreen: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [resendDisabled, setResendDisabled] = useState<boolean>(true);
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);

  const navigate = useNavigate();

  const [registerPatient, { isLoading: isRegistering, error: registerError }] = useRegisterPatientMutation();
  const [verifyOtp, { isLoading: isVerifying, error: verifyError, isSuccess: otpVerified }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isOtpSent && resendDisabled) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    if (timer === 0) {
      setResendDisabled(false);
      clearInterval(interval!);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer, isOtpSent, resendDisabled]);

  const validateName = (name: string) => /^[A-Za-z\s]{3,}$/.test(name);  // Allows letters and spaces, at least 3 characters
  const validateEmail = (email: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);  // Standard email validation
  const validatePassword = (password: string) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{6,}$/.test(password);  // At least 6 characters, with at least one uppercase, one lowercase, one digit, and one special character

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isOtpSent) {
      if (!validateName(name)) {
        toast.error('Invalid name. Name must be at least 3 characters long and contain only letters.');
      } else if (!validateEmail(email)) {
        toast.error('Invalid email format.');
      } else if (!validatePassword(password)) {
        toast.error('Password must be at least 6 characters, including 1 uppercase, 1 lowercase, 1 number, and 1 special character.');
      } else if (password !== confirmPassword) {
        toast.error('Passwords do not match');
      } else {
        try {
          await registerPatient({ name, email, password }).unwrap();
          setIsOtpSent(true);
          setTimer(60);
          setResendDisabled(true);
        } catch (error) {
          toast.error('User Already Exist! Try another Mail ID');
        }
      }
    } else if (isOtpSent && otp.trim() !== '') {
      try {
        await verifyOtp({ email, otp }).unwrap();
      } catch (error) {
        toast.error('Invalid OTP!');
      }
    } else {
      toast.error('Please enter the OTP');
    }
  };

  const resendOtpHandler = async () => {
    try {
      await resendOtp(email).unwrap();
      setTimer(60);
      setResendDisabled(true);
    } catch (error) {
      toast.error('Failed to resend OTP');
    }
  };

  useEffect(() => {
    if (otpVerified) {
      toast.success('Registration completed successfully!');
      navigate('/login');
    }
  }, [otpVerified, navigate]);

  return (
    <FormContainer>
      <h1>{!isOtpSent ? 'Sign Up' : 'Enter OTP'}</h1>
      <Form onSubmit={submitHandler}>
        {!isOtpSent ? (
          <>
            <Form.Group className="my-2" controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="my-2" controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="my-2" controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="my-2" controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3" disabled={isRegistering}>
              {isRegistering ? 'Sending OTP...' : 'Send OTP'}
            </Button>
          </>
        ) : (
          <>
            <Form.Group className="my-2" controlId='otp'>
              <Form.Label>OTP</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </Form.Group>
            <Row className="py-3">
              <Col>
                <Button type="submit" variant="primary" className="mt-3" disabled={isVerifying}>
                  {isVerifying ? 'Verifying...' : 'Verify OTP'}
                </Button>
              </Col>
              <Col>
                <Button
                  variant="secondary"
                  disabled={resendDisabled || isResending}
                  onClick={resendOtpHandler}
                  className="mt-3"
                >
                  {isResending ? 'Resending...' : 'Resend OTP'}
                </Button>
              </Col>
            </Row>
            <p>{timer > 0 ? `Resend OTP in ${timer}s` : 'You can resend OTP now.'}</p>
          </>
        )}
        <Row className="py-3">
          <Col>
            Already have an account? <Link to='/login'>Login</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default RegisterScreen;
