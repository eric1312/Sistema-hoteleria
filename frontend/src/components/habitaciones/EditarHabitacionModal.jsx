import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import useEdit from '../../hooks/useEdit'; 

const API_URL = process.env.REACT_APP_API_URL;

const EditarHabitacionModal = ({ show, handleClose, habitacionId, updateHabitacionesList }) => {
    const { editItem, loading, error } = useEdit(`${API_URL}/habitaciones`, 'Habitación actualizada correctamente');
    const [habitacion, setHabitacion] = useState({
        Num_habitacion: '',
        Tipo_habitacion: '',
        Precio_noche: '',
        Estado: ''
    });

    // Obtener habitación por su ID
    useEffect(() => {
        if (habitacionId) {
            const fetchHabitacion = async () => {
                try {
                    const response = await axios.get(`${API_URL}/habitaciones/${habitacionId}`);
                    setHabitacion(response.data);
                } catch (err) {
                    console.error('Error al cargar la habitación:', err);
                }
            };
            fetchHabitacion();
        }
    }, [habitacionId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHabitacion((prevHabitacion) => ({
            ...prevHabitacion,
            [name]: value,
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        editItem(habitacionId, habitacion);  
        updateHabitacionesList();  
        handleClose();  
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton style={{ color: 'white', backgroundColor: '#343a40' }}>
                <Modal.Title>Editar Habitación</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ color: 'white', backgroundColor: '#343a40' }}>
                {error && <div className="alert alert-danger">{error}</div>} 
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group controlId="formNumHabitacion">
                        <Form.Label>Número de Habitación</Form.Label>
                        <Form.Control
                            type="text"
                            name="Num_habitacion"
                            value={habitacion.Num_habitacion}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formTipoHabitacion">
                        <Form.Label>Tipo de Habitación</Form.Label>
                        <Form.Control
                            type="text"
                            name="Tipo_habitacion"
                            value={habitacion.Tipo_habitacion}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formPrecioNoche">
                        <Form.Label>Precio por Noche</Form.Label>
                        <Form.Control
                            type="number"
                            name="Precio_noche"
                            value={habitacion.Precio_noche}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formEstado">
                        <Form.Label>Estado</Form.Label>
                        <Form.Control
                            type="text"
                            name="Estado"
                            value={habitacion.Estado}
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

export default EditarHabitacionModal;
