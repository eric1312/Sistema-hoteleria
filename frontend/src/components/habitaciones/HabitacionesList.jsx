import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHabitaciones } from '../../api/habitacionesApi';
import EditarHabitacionModal from './EditarHabitacionModal'; // Componente de edición
import useLoading from '../../hooks/useLoading'; // Hook para manejo de carga
import useDelete from '../../hooks/useDelete'; // Hook para manejo de eliminación
import '../../styles/Habitaciones.css';

const API_URL = process.env.REACT_APP_API_URL;

const HabitacionesList = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  const { loading, startLoading, stopLoading } = useLoading();
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedHabitacionId, setSelectedHabitacionId] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchHabitaciones = async () => {
      startLoading();
      try {
        const data = await getHabitaciones();
        setHabitaciones(data);
      } catch (error) {
        console.error('Error al cargar habitaciones:', error);
      } finally {
        stopLoading();
      }
    };
    fetchHabitaciones();
  }, []);



  const { deleteItem } = useDelete(
    `${API_URL}/habitaciones`,
    'Habitación eliminada exitosamente'
  );

  const handleAddHabitacion = () => {
    navigate('/add-room');
  };

  const handleEdit = (id) => {
    setSelectedHabitacionId(id);
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    setHabitaciones(habitaciones.filter((habitacion) => habitacion.Id_habitacion !== id));
  };

  const updateHabitacionesList = () => {
    const fetchHabitaciones = async () => {
      startLoading();
      try {
        const data = await getHabitaciones();
        setHabitaciones(data);
      } catch (error) {
        console.error('Error al cargar habitaciones:', error);
      } finally {
        stopLoading();
      }
    };
    fetchHabitaciones();
  };

  return (
    <div className="container mt-5 px-2">
      <div className="mb-2 d-flex justify-content-between align-items-center">
        <h2>
          <i className="fas fa-bed me-3"></i> Lista de Habitaciones
        </h2>
        <button className="add-button btn btn-success my-3" onClick={handleAddHabitacion}>
          Agregar Habitacion
        </button>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : habitaciones.length === 0 ? (
        <p>No hay habitaciones registradas.</p>
      ) : (
        <div className="table-responsive">
         <table className="table table-borderless table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Número</th>
              <th>Tipo</th>
              <th>Precio</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {habitaciones.map((habitacion) => (

              <tr key={habitacion.Id_habitacion}>
                <td>{habitacion.Id_habitacion}</td>
                <td>{habitacion.Num_habitacion}</td>
                <td>{habitacion.Tipo_habitacion}</td>
                <td>{habitacion.Precio_noche}</td>
                <td>{habitacion.Estado}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning edit-button"
                    onClick={() => handleEdit(habitacion.Id_habitacion)}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                     className="btn btn-sm btn-danger delete-button"
                    onClick={() => handleDelete(habitacion.Id_habitacion)}
                  >
                   <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}


      <EditarHabitacionModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        habitacionId={selectedHabitacionId}
        updateHabitacionesList={updateHabitacionesList}
      />
    </div>
  );
};

export default HabitacionesList;
