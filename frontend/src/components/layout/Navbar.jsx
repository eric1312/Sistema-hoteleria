// Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import "../../styles/layout/Navbar.css";

function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="/assets/images/logo.png"
            alt="Hotel 5 Stars"
            style={{ height: '100px', marginRight: '10px' }}
          />

        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Gestión de Personas */}
            <NavDropdown title="Gestión de Huespedes" id="guests-dropdown">
              <NavDropdown.Item as={Link} to="/guests">
                Lista de Huéspedes
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/add-guest">
                Agregar Huésped
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Gestion de Empleados" id="employees-dropdown">
              <NavDropdown.Item as={Link} to="/employees">
                Lista de Empleados
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/add-employee">
                Agregar Empleado
              </NavDropdown.Item>
            </NavDropdown>

            {/* Gestión de Reservas */}
            <NavDropdown title="Gestion de Reservas" id="reservations-dropdown">
              <NavDropdown.Item as={Link} to="/reservations">
                Lista de Reservas
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/add-reservation">
                Agregar Reserva
              </NavDropdown.Item>
            </NavDropdown>

            {/* Gestión de Cobros */}
            <NavDropdown title="Gestión de Cobros" id="payments-dropdown">
              <NavDropdown.Item as={Link} to="/payments">
                Lista de Pagos
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/add-payment">
                Agregar Pago
              </NavDropdown.Item>
            </NavDropdown>

            {/* Habitaciones */}
            <NavDropdown title="Habitaciones" id="rooms-dropdown">
              <NavDropdown.Item as={Link} to="/rooms">
                Lista de Habitaciones
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/add-room">
                Agregar Habitación
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
