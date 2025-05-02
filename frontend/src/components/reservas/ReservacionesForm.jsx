import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAdd from "../../hooks/useAdd";
import useEdit from "../../hooks/useEdit";
import { getReservaPorId } from "../../api/reservacionesApi";
import { getHuespedes } from "../../api/huespedesApi"; 
import { getHabitaciones } from "../../api/habitacionesApi";
import '../../styles/Reservas.css';

const API_URL = process.env.REACT_APP_API_URL;

const ReservacionesForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Id_huesped: "",
    Id_habitacion: "",
    Fecha_llegada: "",
    Fecha_salida: "",
    Num_noches: "",
    Precio_total: "",
    Estado_reserva: "CONFIRMADO", // defect estado
  });
  const [loading, setLoading] = useState(false);
  const [huespedes, setHuespedes] = useState([]);
  const [habitaciones, setHabitaciones] = useState([]);

  const { addItem } = useAdd(
    `${API_URL}/reservas`,
    "Reserva agregada correctamente"
  );
  const { editItem } = useEdit(
    `${API_URL}/reservas`,
    "Reserva actualizada correctamente"
  );

//habitaciones
  useEffect(() => {
    setLoading(true);
  
    getHabitaciones()
      .then((data) => {
        setHabitaciones(data); 
      })
      .catch((err) => {
        console.error("Error al cargar habitaciones:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); 


  //huespedes
  useEffect(() => {

    setLoading(true);
    getHuespedes()
      .then((data) => {
        setHuespedes(data); 
      })
      .catch((err) => {
        console.error("Error al cargar huéspedes:", err);
      })
      .finally(() => {
        setLoading(false); 
      });
  }, []);
  

//reserva
  useEffect(() => {
    if (id) {
      setLoading(true);
      getReservaPorId(id) //cargamos reserva x id
        .then((data) => {
          setFormData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error al cargar la reserva:", err);
          setLoading(false);
        });
    }
  }, [id]);

  // cambios en camp de form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // enviamos form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await editItem(id, formData); // editamosreserva
      } else {
        await addItem(formData); // agregamos reserva
      }
      setLoading(false);
      navigate("/reservations"); // redirigimos a reservas
    } catch (error) {
      console.error("Error al guardar la reserva:", error);
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    );

  return (
   
      <form id="form-reservas" onSubmit={handleSubmit}>
        <h2><i className="fas fa-calendar-alt me-3"></i>
          {id ? "Editar Reserva" : "Agregar Nueva Reserva"}
        </h2>

        <div>
          <label>Id Huésped</label>
          <select
          name="Id_huesped"
          value={formData.Id_huesped}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona un huésped</option>
          {huespedes.map((huesped) => (
            <option key={huesped.Id_huesped} value={huesped.Id_huesped}>
              {huesped.Id_huesped} - {huesped.Nombre} {huesped.Apellido}
            </option>
          ))}
        </select>
        </div>
        <div>
          <label>Id Habitación</label>
          <select
    name="Id_habitacion"
    value={formData.Id_habitacion}
    onChange={handleChange}
    required
  >
    <option value="">Selecciona una habitación</option>
    {habitaciones.length > 0 ? (
      habitaciones.map((habitacion) => (
        <option key={habitacion.Id_habitacion} value={habitacion.Id_habitacion}>
          {habitacion.Id_habitacion} - {habitacion.Tipo_habitacion} ({habitacion.Num_habitacion})
        </option>
      ))
    ) : (
      <option disabled>No hay habitaciones disponibles</option>
    )}
  </select>
        </div>
        <div>
          <label>Fecha Llegada</label>
          <input
            type="date"
            name="Fecha_llegada"
            value={formData.Fecha_llegada}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Fecha Salida</label>
          <input
            type="date"
            name="Fecha_salida"
            value={formData.Fecha_salida}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Número de Noches</label>
          <input
            type="number"
            name="Num_noches"
            value={formData.Num_noches}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Precio Total</label>
          <input
            type="number"
            name="Precio_total"
            value={formData.Precio_total}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Estado Reserva</label>
          <select
            name="Estado_reserva"
            value={formData.Estado_reserva}
            onChange={handleChange}
          >
            <option value="CONFIRMADO">Confirmado</option>
            <option value="CANCELADO">Cancelado</option>
            <option value="PENDIENTE">Pendiente</option>
            <option value="FINALIZADO">Finalizado</option>
          </select>
        </div>
        <div className="button-container">
        <button type="submit">{id ? "Actualizar" : "Agregar"}</button>
        </div>
      </form>
  
  );
};

export default ReservacionesForm;

