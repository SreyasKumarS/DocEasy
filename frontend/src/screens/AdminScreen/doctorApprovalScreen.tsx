import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import axios from 'axios';

interface Doctor {
  _id: string;
  name: string;
  email: string;
  licenseNumber: string;
  medicalLicense: string;
  specialization: string;
  isVerified: boolean;
  isApproved: boolean;
  createdAt: string;
}

const DoctorApprovals: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/unapproved', { withCredentials: true });
      setDoctors(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      setDoctors([]);
    }
  };
  
  useEffect(() => {
    fetchDoctors();
  }, []);
  
  const handleApprove = async (doctorId: string) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/approve/${doctorId}`, {}, {
        withCredentials: true, 
      });
      fetchDoctors();
    } catch (error) {
      console.error("Error approving doctor:", error);
    }
  };

  const handleReject = async (doctorId: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/delete/${doctorId}`, {
        withCredentials: true, 
      });
      fetchDoctors();
    } catch (error) {
      console.error("Error rejecting doctor:", error);
    }
  };

  return (
    <Container fluid className="p-4">
      <h2 className="mb-4">Doctor Approval Requests</h2>
      <Row>
        <Col md={12}>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Index</th> 
                <th>Name</th>
                <th>Email</th>
                <th>License Number</th>
                <th>Specialization</th>
                <th>Medical License</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors && doctors.length > 0 ? (
                doctors
                  .filter((doctor) => !doctor.isApproved)
                  .map((doctor, index) => (
                    <tr key={doctor._id}>
                      <td>{index + 1}</td> 
                      <td>{doctor.name}</td>
                      <td>{doctor.email}</td>
                      <td>{doctor.licenseNumber}</td>
                      <td>{doctor.specialization}</td>
                      <td>{doctor.medicalLicense}</td>
                      <td>{new Date(doctor.createdAt).toLocaleDateString()}</td>
                      <td>
                        <Button variant="success" className="me-2" onClick={() => handleApprove(doctor._id)}>
                          Approve
                        </Button>
                        <Button variant="danger" onClick={() => handleReject(doctor._id)}>
                          Reject
                        </Button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan={8}>No unapproved doctors found.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorApprovals;
