import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAdd from "../../hooks/useAdd";
import useEdit from "../../hooks/useEdit";
import { getPagoPorId } from "../../api/pagosApi";
import { getReservas } from "../../api/reservacionesApi";
import { getEmployees } from "../../api/empleadosApi";
import { getHuespedPorId } from "../../api/huespedesApi";
import '../../styles/Pagos.css';

const API_URL = process.env.REACT_APP_API_URL;

const PagosForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Id_reserva: "",
    Fecha_pago: "",
    Monto_pago: "",
    Metodo_pago: "EFECTIVO",
    Id_empleado: "",
    Huesped: "", //muestra nomb 
  });
  const [loading, setLoading] = useState(false);
  const [empleados, setEmpleados] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [reservaExistente, setReservaExistente] = useState(false);

  const { addItem } = useAdd(
    `${API_URL}/pagos`,
    "Pago agregado correctamente"
  );
  const { editItem } = useEdit(
    `${API_URL}/pagos`,
    "Pago actualizado correctamente"
  );

  // editar si el id existe
  useEffect(() => {
    if (id) {
      setLoading(true);
      getPagoPorId(id)
        .then((data) => {
          setFormData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error al cargar el pago:", err);
          setLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    setLoading(true);
    getEmployees()
      .then((data) => {
        setEmpleados(data);
      })
      .catch((error) => {
        console.error("Error al cargar empleados:", error);
      });

    getReservas()
      .then((data) => {
        setReservas(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar reservas:", error);
        setLoading(false);
      });
  }, []);

  // cambio form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearchReserva = (e) => {
    const reservaId = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      Id_reserva: reservaId,
      Huesped: "", 
    }));
    setReservaExistente(false);
  
    // verifico q la reserva exista
    const reserva = reservas.find((r) => r.Id_reserva.toString() === reservaId);
    if (reserva) {
      // si existe, buscar el huesped por ID
      getHuespedPorId(reserva.Id_huesped)
        .then((huesped) => {
          setFormData((prevState) => ({
            ...prevState,
            Huesped: `${huesped.Nombre} ${huesped.Apellido}`, 
          }));
          setReservaExistente(true);
        })
        .catch((error) => {
          console.error("Error al cargar huesped:", error);
        });
    }
  };
  

  // Envio del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    formData.Monto_pago = parseFloat(formData.Monto_pago); // montoPago a num

    try {
      if (id) {
        await editItem(id, formData);
      } else {
        await addItem(formData);
      }
      setLoading(false);
      navigate("/payments");
    } catch (error) {
      console.error("Error al guardar el pago:", error);
      setLoading(false);
    }
  };

  if (loading) return <div className="spinner-border" role="status"><span className="visually-hidden">Cargando...</span></div>;

  return (
    <form id="form-pagos" onSubmit={handleSubmit}>
      <h2 className="text-center mb-4">
        <i className="fas fa-money-bill-wave me-2"></i>
        {id ? "Editar Pago" : "Agregar Nuevo Pago"}
      </h2>

      <div>
        <label>ID Reserva</label>
        <input
          type="text"
          name="Id_reserva"
          value={formData.Id_reserva}
          onChange={handleSearchReserva}
          placeholder="Buscar por ID de reserva"
          required
        />
        {reservaExistente ? (
          <div>
            <small>Huésped: {formData.Huesped}</small>
          </div>
        ) : (
          formData.Id_reserva && <div><small>No se encontró la reserva.</small></div>
        )}
      </div>

      <div>
        <label>Fecha Pago</label>
        <input
          type="date"
          name="Fecha_pago"
          value={formData.Fecha_pago}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Monto Pago</label>
        <input
          type="number"
          name="Monto_pago"
          value={formData.Monto_pago}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Método de Pago</label>
        <select
          name="Metodo_pago"
          value={formData.Metodo_pago}
          onChange={handleChange}
        >
          <option value="EFECTIVO">Efectivo</option>
          <option value="DÉBITO">Débito</option>
          <option value="TRANSFERENCIA">Transferencia</option>
        </select>
      </div>

      <div>
        <label>ID Empleado</label>
        <select
          name="Id_empleado"
          value={formData.Id_empleado}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona un empleado</option>
          {empleados.map((empleado) => (
            <option key={empleado.Id_empleado} value={empleado.Id_empleado}>
              {empleado.Id_empleado} - {empleado.Nombre} {empleado.Apellido}
            </option>
          ))}
        </select>
      </div>

      <div className="button-container">
        <button type="submit">{id ? "Actualizar" : "Agregar"}</button>
      </div>
    </form>
  );
};

export default PagosForm;
