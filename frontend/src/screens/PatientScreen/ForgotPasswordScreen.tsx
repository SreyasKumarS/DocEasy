// import React, { useState } from 'react';
// import { Form, Button } from 'react-bootstrap';
// import { useSendResetOtpMutation } from '../../slices/patientSlice/patientApiSlice'; // API call to request OTP
// import FormContainer from '../../components/patientComponents/FormContainer';
// import { toast } from 'react-toastify';



// const RequestOtpScreen: React.FC = () => {
//   const [email, setEmail] = useState<string>('');
//   const [sendResetOtp, { isLoading }] = useSendResetOtpMutation();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await sendResetOtp( email ).unwrap();
//       toast.success('OTP sent to your email');
   
//     } catch (error) {
//       console.error('Error sending OTP:', error); // Check error message in the browser console
//     }
//   };
  

//   return (
//     <FormContainer>
//       <h2>Request Password Reset OTP</h2>
//       <Form onSubmit={handleSubmit}>
//         <Form.Group controlId="email" className="my-2">
//           <Form.Label>Email Address</Form.Label>
//           <Form.Control
//             type="email"
//             placeholder="Enter your email address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </Form.Group>

//         <Button type="submit" variant="primary" className="mt-3" disabled={isLoading}>
//           {isLoading ? 'Sending OTP...' : 'Send OTP'}
//         </Button>
//       </Form>
//     </FormContainer>
//   );
// };

// export default RequestOtpScreen;











import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useSendResetOtpMutation,useVerifyOtpMutation } from '../../slices/patientSlice/patientApiSlice'; // API call to request OTP
import FormContainer from '../../components/patientComponents/FormContainer';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const RequestOtpScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>(''); // State for OTP input
  const [otpSent, setOtpSent] = useState<boolean>(false); // Track if OTP is sent
  const [isVerifying, setIsVerifying] = useState<boolean>(false); // OTP verification state
  const [resendDisabled, setResendDisabled] = useState<boolean>(true); // Disable resend button
  const [timer, setTimer] = useState<number>(60); // Timer for resending OTP
  const [isResending, setIsResending] = useState<boolean>(false); // Resending state
  let interval: NodeJS.Timeout; // Timer interval

  const [sendResetOtp, { isLoading }] = useSendResetOtpMutation();
  const [verifyOtp]=useVerifyOtpMutation()
  const navigate = useNavigate(); 

  useEffect(() => {
    if (otpSent && resendDisabled) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setResendDisabled(false); // Enable the resend button after time elapses
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    // Cleanup the timer on component unmount
    return () => clearInterval(interval);
  }, [otpSent, resendDisabled]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendResetOtp(email).unwrap();
      toast.success('OTP sent to your email');
      setOtpSent(true); // Set OTP sent status to true
      setResendDisabled(true); // Disable resend button initially
      setTimer(60); // Reset timer
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const resendOtpHandler = async () => {
    try {
      setIsResending(true);
      await sendResetOtp(email).unwrap();
      toast.success('OTP resent');
      setIsResending(false);
      setResendDisabled(true); // Disable resend button
      setTimer(60); // Reset timer
    } catch (error) {
      console.error('Error resending OTP:', error);
      setIsResending(false);
    }
  };

  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    try {
      // Call the verifyOtp API and send email and otp for verification
      await verifyOtp({email, otp }).unwrap();
      toast.success('OTP Verified Successfully!');
      navigate('/resetPassword', { state: { email } });
    } catch (error) {
      toast.error('OTP verification failed, please try again');
      console.error('Error verifying OTP:', error);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <FormContainer>
      <h2>Request Password Reset OTP</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email" className="my-2">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3" disabled={isLoading || otpSent}>
          {isLoading ? 'Sending OTP...' : 'Send OTP'}
        </Button>
      </Form>

      {otpSent && (
        <>
          <Form onSubmit={handleOtpVerify}>
            <Form.Group controlId="otp" className="my-2">
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
            <p>{timer > 0 ? `Resend OTP in ${timer}s` : ''}</p>
          </Form>
        </>
      )}
    </FormContainer>
  );
};

export default RequestOtpScreen;
