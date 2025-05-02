import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import useEdit from '../../hooks/useEdit';

const API_URL = process.env.REACT_APP_API_URL;

const EditarReservaModal = ({ show, handleClose, reservaId, updateReservaList }) => {
  const { editItem, loading, error } = useEdit(`${API_URL}/reservas`, 'Reserva actualizada correctamente');
  const [reserva, setReserva] = useState({
    Id_huesped: '',
    Id_habitacion: '',
    Fecha_llegada: '',
    Fecha_salida: '',
    Num_noches: '',
    Precio_total: '',
    Estado_reserva: ''
  });

  useEffect(() => {
    if (show && reservaId) {
      const fetchReserva = async () => {
        try {
          const response = await axios.get(`${API_URL}/reservas/${reservaId}`);
          if (response.data) {
            setReserva(response.data); 
          }
        } catch (err) {
          console.error('Error al cargar la reserva:', err);
          alert('No se pudo cargar la reserva. Intenta nuevamente.');
        }
      };
      fetchReserva();
    }
  }, [show, reservaId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReserva((prevReserva) => ({
      ...prevReserva,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (reservaId && reserva) {
      editItem(reservaId, reserva); // funcion para actualizar la reserva
      if (typeof updateReservaList === 'function') {
        updateReservaList(reserva); // actualiza la lista de reservas
      } else {
        console.error('updateReservaList no es una función');
      }
      handleClose(); // cierra el modal
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton style={{ color: 'white', backgroundColor: '#343a40' }}>
        <Modal.Title>Editar Reserva</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ color: 'white', backgroundColor: '#343a40' }}>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="formIdHuesped">
            <Form.Label>ID Huésped</Form.Label>
            <Form.Control
              type="text"
              name="Id_huesped"
              value={reserva.Id_huesped}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formIdHabitacion">
            <Form.Label>ID Habitación</Form.Label>
            <Form.Control
              type="text"
              name="Id_habitacion"
              value={reserva.Id_habitacion}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formFechaLlegada">
            <Form.Label>Fecha de Llegada</Form.Label>
            <Form.Control
              type="date"
              name="Fecha_llegada"
              value={reserva.Fecha_llegada}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formFechaSalida">
            <Form.Label>Fecha de Salida</Form.Label>
            <Form.Control
              type="date"
              name="Fecha_salida"
              value={reserva.Fecha_salida}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formNumNoches">
            <Form.Label>Número de Noches</Form.Label>
            <Form.Control
              type="number"
              name="Num_noches"
              value={reserva.Num_noches}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPrecioTotal">
            <Form.Label>Precio Total</Form.Label>
            <Form.Control
              type="number"
              name="Precio_total"
              value={reserva.Precio_total}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEstadoReserva">
            <Form.Label>Estado de Reserva</Form.Label>
            <Form.Control
              as="select"
              name="Estado_reserva"
              value={reserva.Estado_reserva}
              onChange={handleChange}
              required
            >
              <option value="PENDIENTE">Pendiente</option>
              <option value="CONFIRMADO">Confirmado</option>
              <option value="CANCELADO">Cancelado</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Cargando...' : 'Actualizar'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditarReservaModal;
