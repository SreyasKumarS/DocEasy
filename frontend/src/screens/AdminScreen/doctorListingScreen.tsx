// import React, { useEffect, useState } from 'react';
// import { Container, Row, Col, Button, Table } from 'react-bootstrap';
// import axios from 'axios';

// interface Doctor {
//   _id: string;
//   name: string;
//   email: string;
//   licenseNumber: string;
//   medicalLicense: string;
//   specialization: string;
//   isVerified: boolean;
//   isApproved: boolean;  // This will represent whether the doctor is blocked or not.
//   createdAt: string;
// }

// const DoctorApprovals: React.FC = () => {
//   const [doctors, setDoctors] = useState<Doctor[]>([]);

//   const fetchDoctors = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/admin/unapproved', { withCredentials: true });
//       setDoctors(Array.isArray(response.data) ? response.data : []);
//     } catch (error) {
//       setDoctors([]);
//     }
//   };

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   // Toggle Block/Unblock functionality
//   const handleToggleBlock = async (doctorId: string, isApproved: boolean) => {
//     try {
//       const action = isApproved ? 'block' : 'unblock'; // Define the action based on current approval status
//       await axios.put(`http://localhost:5000/api/admin/${action}/${doctorId}`, {}, {
//         withCredentials: true,
//       });
//       fetchDoctors(); // Fetch the updated list after toggling
//     } catch (error) {
//       console.error(`Error trying to ${isApproved ? 'block' : 'unblock'} the doctor:`, error);
//     }
//   };

//   return (
//     <Container fluid className="p-4">
//       <h2 className="mb-4">Doctor Approval Requests</h2>
//       <Row>
//         <Col md={12}>
//           <Table striped bordered hover responsive>
//             <thead>
//               <tr>
//                 <th>Index</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>License Number</th>
//                 <th>Specialization</th>
//                 <th>Medical License</th>
//                 <th>Date</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {doctors && doctors.length > 0 ? (
//                 doctors.map((doctor, index) => (
//                   <tr key={doctor._id}>
//                     <td>{index + 1}</td>
//                     <td>{doctor.name}</td>
//                     <td>{doctor.email}</td>
//                     <td>{doctor.licenseNumber}</td>
//                     <td>{doctor.specialization}</td>
//                     <td>{doctor.medicalLicense}</td>
//                     <td>{new Date(doctor.createdAt).toLocaleDateString()}</td>
//                     <td>
//                       <Button
//                         variant={doctor.isApproved ? 'danger' : 'success'}
//                         onClick={() => handleToggleBlock(doctor._id, doctor.isApproved)}
//                       >
//                         {doctor.isApproved ? 'Block' : 'Unblock'}
//                       </Button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={8}>No doctors found.</td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default DoctorApprovals;





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
  isApproved: boolean;  // Represents whether the doctor is blocked or not.
  createdAt: string;
}

const DoctorApprovals: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin//fetchAllDoctors', { withCredentials: true });
      setDoctors(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      setDoctors([]);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Toggle Block/Unblock functionality
  const handleToggleBlock = async (doctorId: string, isApproved: boolean) => {
    try {
      const action = isApproved ? 'block' : 'unblock'; // Define the action based on current approval status
      await axios.put(`http://localhost:5000/api/admin/${action}/${doctorId}`, {}, {
        withCredentials: true,
      });

      // Update the specific doctor's approval status in the state without refetching the entire list
      setDoctors((prevDoctors) =>
        prevDoctors.map((doctor) =>
          doctor._id === doctorId ? { ...doctor, isApproved: !isApproved } : doctor
        )
      );
    } catch (error) {
      console.error(`Error trying to ${isApproved ? 'block' : 'unblock'} the doctor:`, error);
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
                doctors.map((doctor, index) => (
                  <tr key={doctor._id}>
                    <td>{index + 1}</td>
                    <td>{doctor.name}</td>
                    <td>{doctor.email}</td>
                    <td>{doctor.licenseNumber}</td>
                    <td>{doctor.specialization}</td>
                    <td>{doctor.medicalLicense}</td>
                    <td>{new Date(doctor.createdAt).toLocaleDateString()}</td>
                    <td>
                      <Button
                        variant={doctor.isApproved ? 'danger' : 'success'}
                        onClick={() => handleToggleBlock(doctor._id, doctor.isApproved)}
                      >
                        {doctor.isApproved ? 'Block' : 'Unblock'}
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8}>No doctors found.</td>
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
