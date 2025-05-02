import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import useEdit from '../../hooks/useEdit';

const API_URL = process.env.REACT_APP_API_URL;

const EditarHuespedModal = ({ show, handleClose, huespedId, updateHuespedList }) => {
    const { editItem, loading, error } =  useEdit(`${API_URL}/huespedes`, 'Huésped actualizado correctamente');
    const [huesped, setHuesped] = useState({
        Nombre: '',
        Apellido: '',
        Direccion: '',
        Telefono: '',
        Mail: ''
    });
    
    useEffect(() => {
        if (show && huespedId) {
            const fetchHuesped = async () => {
                try {
                    const response = await axios.get(`${API_URL}/huespedes/${huespedId}`);
                    if (response.data) {
                        setHuesped(response.data); //respuesta data
                    }
                } catch (err) {
                    console.error('Error al cargar el huésped:', err);
                    alert('No se pudo cargar el huésped. Intenta nuevamente.');
                }
            };
            fetchHuesped();
        }
    }, [show, huespedId]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setHuesped((prevHuesped) => ({
            ...prevHuesped,
            [name]: value,
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (huespedId && huesped) {
            editItem(huespedId, huesped);
            updateHuespedList(huesped); //actualizo
            handleClose();
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton style={{ color: 'white', backgroundColor: '#343a40' }}>
                <Modal.Title>Editar Huésped</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ color: 'white', backgroundColor: '#343a40' }}>
                {error && <div className="alert alert-danger">{error}</div>}
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group controlId="formNombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="Nombre"
                            value={huesped.Nombre }
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formApellido">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                            type="text"
                            name="Apellido"
                            value={huesped.Apellido }
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formDireccion">
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control
                            type="text"
                            name="Direccion"
                            value={huesped.Direccion}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formTelefono">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control
                            type="text"
                            name="Telefono"
                            value={huesped.Telefono }
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="Mail"
                            value={huesped.Mail }
                            onChange={handleChange}
                            required
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

export default EditarHuespedModal;
