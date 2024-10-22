import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../../components/patientComponents/FormContainer"; 
import { useRegisterDoctorMutation, useVerifyOtpDoctorMutation, useResendOtpMutation } from '../../slices/doctorSlice/doctorApiSlice';
import { toast } from 'react-toastify';

const DoctorRegisterScreen: React.FC = () => {  
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [specialization, setSpecialization] = useState<string>(''); 
  const [licenseNumber, setLicenseNumber] = useState<string>(''); 
  const [resendDisabled, setResendDisabled] = useState<boolean>(true);
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);
  const [otpVerified, setOtpVerified] = useState<boolean>(false);
  const [licenseFile, setLicenseFile] = useState<File | null>(null); 

  const navigate = useNavigate();
  const [registerDoctor] = useRegisterDoctorMutation();
  const [verifyOtp] = useVerifyOtpDoctorMutation();
  const [resendOtp] = useResendOtpMutation();

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

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isOtpSent) {
      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
      } else if (!specialization) {
        toast.error('Please provide your specialization');
      } else if (!licenseNumber) {
        toast.error('Please provide your license number');
      } else if (!licenseFile) {  
        toast.error('Please upload your medical license certificate');
      } else {
        
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('specialization', specialization);
        formData.append('licenseNumber', licenseNumber);
        formData.append('licenseFile', licenseFile); 

        try {
          await registerDoctor(formData).unwrap(); 
          toast.success('OTP sent successfully!');
          setIsOtpSent(true);
          setTimer(60);
          setResendDisabled(true);
        } catch (error:any ) {
          toast.error(error.message || error || 'Doctor already exists! Try another email.');
        }
      }
    } else if (isOtpSent && otp.trim() !== '') {
      try {
      
        await verifyOtp({ email, otp }).unwrap();
        setOtpVerified(true); 
        toast.success('OTP verified successfully!');
      } catch (error) {
        console.error('Error verifying OTP:', error); 
        toast.error('Invalid OTP!');
      }
    } else {
      toast.error('Please enter the OTP');
    }
  };
  
  
  useEffect(() => {
    if (otpVerified) {
      toast.success('Registration completed successfully!');
      navigate('/doctor/login'); 
    }
  }, [otpVerified, navigate]);

  const resendOtpHandler = async () => {
    try {
      await resendOtp(email).unwrap();
      setTimer(60);
      setResendDisabled(true);
    } catch (error) {
      toast.error('Failed to resend OTP');
    }
  };

  return (
    <FormContainer>
      <h1>{!isOtpSent ? 'Doctor Sign Up' : 'Enter OTP'}</h1>
      <Form onSubmit={submitHandler}>
        {!isOtpSent ? (
          <>
            {/* Doctor Registration Form */}
            <Form.Group className="my-2" controlId='name'>
              <Form.Label>Doctor Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Full Name"
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

            <Form.Group className="my-2" controlId='specialization'>
              <Form.Label>Specialization</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Specialization"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="my-2" controlId='licenseNumber'>
              <Form.Label>License Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter License Number"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="my-2" controlId='licenseFile'>
              <Form.Label>Medical License Certificate</Form.Label>
              <Form.Control
                type="file"
                name="licenseFile"
                onChange={(e) => {
                  const target = e.target as HTMLInputElement; 
                  setLicenseFile(target.files ? target.files[0] : null);
                }}
                required
                />
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-3">
              Send OTP
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
                <Button type="submit" variant="primary" className="mt-3">
                  Verify OTP
                </Button>
              </Col>
              <Col>
                <Button
                  variant="secondary"
                  disabled={resendDisabled}
                  onClick={resendOtpHandler}
                  className="mt-3"
                >
                  Resend OTP
                </Button>
              </Col>
            </Row>
            <p>{timer > 0 ? `Resend OTP in ${timer}s` : 'You can resend OTP now.'}</p>
          </>
        )}
        <Row className="py-3">
          <Col>
            Already have an account? <Link to='/doctor/login'>Login</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default DoctorRegisterScreen;
