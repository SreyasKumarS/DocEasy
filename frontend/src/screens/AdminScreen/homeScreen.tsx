import React from 'react';
import { Container, Row, Col, Card, Button, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaUserMd, FaUsers, FaCog } from 'react-icons/fa';

const AdminHomeScreen: React.FC = () => {
  const navigate = useNavigate();

  const navigateTo = (route: string) => {
    navigate(route);
  };

  return (
    <Container fluid className="p-4">
      <Row>
        {/* Sidebar Navigation */}
        <Col md={3} className="sidebar">
          <Nav className="flex-column bg-light p-3 h-100 shadow-sm rounded">
            <h5 className="text-primary">Admin Dashboard</h5>
            <Nav.Link onClick={() => navigateTo('/admin/adminHomeScreen')} className="text-dark">
              Dashboard
            </Nav.Link>
            <Nav.Link onClick={() => navigateTo('/admin/DoctorApprovalScreen')} className="text-dark">
              Doctor Approvals
            </Nav.Link>
            <Nav.Link onClick={() => navigateTo('/admin/manage-users')} className="text-dark">
              Manage Users
            </Nav.Link>
            <Nav.Link onClick={() => navigateTo('/admin/settings')} className="text-dark">
              Settings
            </Nav.Link>
          </Nav>
        </Col>

        {/* Main Content */}
        <Col md={9}>
          <Container>
            <h1 className="mb-4 text-center">Admin Portal Overview</h1>
            <Row>
              {/* Doctor Approvals Card */}
              <Col md={6} className="mb-4">
                <Card className="shadow-sm card-hover">
                  <Card.Body>
                    <div className="d-flex align-items-center">
                      <FaUserMd size={30} className="me-3 text-primary" /> {/* Icon */}
                      <Card.Title>Doctor Approvals</Card.Title>
                    </div>
                    <Card.Text>
                      Review and approve or reject doctor registrations to allow them access.
                    </Card.Text>
                    <Button
                      variant="primary"
                      className="btn-hover"
                      onClick={() => navigateTo('/admin/DoctorApprovalScreen')}
                    >
                      Manage Approvals
                    </Button>
                  </Card.Body>
                </Card>
              </Col>

              {/* Manage Users Card */}
              <Col md={6} className="mb-4">
                <Card className="shadow-sm card-hover">
                  <Card.Body>
                    <div className="d-flex align-items-center">
                      <FaUsers size={30} className="me-3 text-secondary" /> {/* Icon */}
                      <Card.Title>Manage Users</Card.Title>
                    </div>
                    <Card.Text>
                      View and manage the users who are registered on the platform.
                    </Card.Text>
                    <Button
                      variant="secondary"
                      className="btn-hover"
                      onClick={() => navigateTo('/admin/manage-users')}
                    >
                      Manage Users
                    </Button>
                  </Card.Body>
                </Card>
              </Col>

              {/* Settings Card */}
              <Col md={6} className="mb-4">
                <Card className="shadow-sm card-hover">
                  <Card.Body>
                    <div className="d-flex align-items-center">
                      <FaCog size={30} className="me-3 text-warning" /> {/* Icon */}
                      <Card.Title>System Settings</Card.Title>
                    </div>
                    <Card.Text>
                      Configure system settings and customize the platform preferences.
                    </Card.Text>
                    <Button
                      variant="warning"
                      className="btn-hover"
                      onClick={() => navigateTo('/admin/settings')}
                    >
                      Go to Settings
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>

      {/* Footer (Optional) */}
      <footer className="text-center py-4 bg-light shadow-sm mt-auto">
        <p className="mb-0 text-muted">© 2024 Admin Portal. All Rights Reserved.</p>
      </footer>
    </Container>
  );
};

export default AdminHomeScreen;
