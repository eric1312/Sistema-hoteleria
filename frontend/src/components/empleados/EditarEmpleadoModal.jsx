import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import useEdit from '../../hooks/useEdit';

const API_URL = process.env.REACT_APP_API_URL;

const EditarEmpleadoModal = ({ show, handleClose, employeeId, updateEmployeeList }) => {
    const { editItem, loading, error } = useEdit(`${API_URL}/empleados`, 'Empleado actualizado correctamente');
    const [employee, setEmployee] = useState({
        Nombre: '',
        Apellido: '',
        Cargo: '',
        Telefono: '',
        Email: ''
    });

    useEffect(() => {
        if (employeeId) {
            const fetchEmployee = async () => {
                try {
                    const response = await axios.get(`${API_URL}/empleados/${employeeId}`);
                    setEmployee(response.data);
                } catch (err) {
                    console.error('Error al cargar el empleado:', err);
                }
            };
            fetchEmployee();
        }
    }, [employeeId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            [name]: value,
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        editItem(employeeId, employee); 
        updateEmployeeList(); 
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton style={{ color: 'white', backgroundColor: '#343a40' }}>
                <Modal.Title>Editar Empleado</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ color: 'white', backgroundColor: '#343a40' }}>
                {error && <div className="alert alert-danger">{error}</div>} 
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group controlId="formNombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="Nombre"
                            value={employee.Nombre}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formApellido">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                            type="text"
                            name="Apellido"
                            value={employee.Apellido}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formCargo">
                        <Form.Label>Cargo</Form.Label>
                        <Form.Control
                            type="text"
                            name="Cargo"
                            value={employee.Cargo}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formTelefono">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control
                            type="text"
                            name="Telefono"
                            value={employee.Telefono}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="Email"
                            value={employee.Email}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? 'Cargando...' : 'Actualizar'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditarEmpleadoModal;

