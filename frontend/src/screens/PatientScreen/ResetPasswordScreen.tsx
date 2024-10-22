import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useResetPasswordMutation} from '../../slices/patientSlice/patientApiSlice'; 
import FormContainer from '../../components/patientComponents/FormContainer';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPasswordWithOtpScreen: React.FC = () => {

  const location = useLocation();
  const { email } = location.state || {};
  
  const [newPassword, setNewPassword] = useState<string>(''); 
  const [confirmPassword, setConfirmPassword] = useState<string>(''); 
  const [resetPasswordWithOtp, { isLoading }] = useResetPasswordMutation();
  
  const navigate = useNavigate(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await resetPasswordWithOtp({ email,newPassword,confirmPassword }).unwrap();
      navigate('/login');
      toast.success('password reset successfully!');
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  return (
    <FormContainer>
      <h2>Reset Password</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="newPassword" className="my-2">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword" className="my-2">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          Reset Password
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ResetPasswordWithOtpScreen;
