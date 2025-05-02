import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import useEdit from '../../hooks/useEdit';

const API_URL = process.env.REACT_APP_API_URL;

const EditarPagoModal = ({ show, handleClose, pagoId, updatePagoList }) => {
    const { editItem, loading, error } = useEdit(`${API_URL}/pagos`, 'Pago actualizado correctamente');
    const [pago, setPago] = useState({
        Id_reserva: '',
        Fecha_pago: '',
        Monto_pago: '',
        Metodo_pago: '',
        Id_empleado: ''
    });
    
    useEffect(() => {
        if (show && pagoId) {
            const fetchPago = async () => {
                try {
                    const response = await axios.get(`${API_URL}/pagos/${pagoId}`);
                    if (response.data) {
                        setPago(response.data); 
                    }
                } catch (err) {
                    console.error('Error al cargar el pago:', err);
                    alert('No se pudo cargar el pago. Intenta nuevamente.');
                }
            };
            fetchPago();
        }
    }, [show, pagoId]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPago((prevPago) => ({
            ...prevPago,
            [name]: value,
        }));
    };
    

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (pagoId && pago) {
            editItem(pagoId, pago); // funcion actualizar el pago
            if (typeof updatePagoList === 'function') {
                updatePagoList(pago); // actualiza lista
            } else {
                console.error('updatePagoList no es una función');
            }
            handleClose(); // close modal
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton style={{ color: 'white', backgroundColor: '#343a40' }}>
                <Modal.Title>Editar Pago</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ color: 'white', backgroundColor: '#343a40' }}>
                {error && <div className="alert alert-danger">{error}</div>}
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group controlId="formIdReserva">
                        <Form.Label>ID Reserva</Form.Label>
                        <Form.Control
                            type="text"
                            name="Id_reserva"
                            value={pago.Id_reserva}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formFechaPago">
                        <Form.Label>Fecha de Pago</Form.Label>
                        <Form.Control
                            type="date"
                            name="Fecha_pago"
                            value={pago.Fecha_pago}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formMontoPago">
                        <Form.Label>Monto de Pago</Form.Label>
                        <Form.Control
                            type="number"
                            name="Monto_pago"
                            value={pago.Monto_pago}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formMetodoPago">
                        <Form.Label>Método de Pago</Form.Label>
                        <Form.Control
                            type="text"
                            name="Metodo_pago"
                            value={pago.Metodo_pago}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formIdEmpleado">
                        <Form.Label>ID Empleado</Form.Label>
                        <Form.Control
                            type="text"
                            name="Id_empleado"
                            value={pago.Id_empleado}
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

export default EditarPagoModal;
