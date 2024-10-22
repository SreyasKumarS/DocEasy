import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useResetAdminPasswordMutation } from '../../slices/adminSlice/adminApiSlice'; // API slice for admin password reset
import FormContainer from '../../components/patientComponents/FormContainer'; // Use the admin-specific form container
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetAdminPasswordWithOtpScreen: React.FC = () => {

  const location = useLocation();
  const { email } = location.state || {}; // Retrieve email from the location state
  
  const [newPassword, setNewPassword] = useState<string>(''); // State for the new password
  const [confirmPassword, setConfirmPassword] = useState<string>(''); // State for confirming the new password
  const [resetAdminPasswordWithOtp, { isLoading }] = useResetAdminPasswordMutation(); // Admin password reset mutation
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      await resetAdminPasswordWithOtp({ email, newPassword, confirmPassword }).unwrap(); // Call admin password reset API
      toast.success('Password reset successfully!');
      navigate('/admin/login'); // Redirect to admin login page after success
    } catch (error) {
      console.error('Error resetting password:', error);
      toast.error('Failed to reset password. Please try again.');
    }
  };

  return (
    <FormContainer>
      <h2>Reset Admin Password</h2>
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

        <Button type="submit" variant="primary" className="mt-3" disabled={isLoading}>
          {isLoading ? 'Resetting Password...' : 'Reset Password'}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ResetAdminPasswordWithOtpScreen;
