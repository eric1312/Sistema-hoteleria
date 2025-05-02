import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHuespedes } from '../../api/huespedesApi';
import EditarHuespedModal from './EditarHuespedModal'; // Corrige el import
import useLoading from '../../hooks/useLoading';
import useDelete from '../../hooks/useDelete';
import '../../styles/Huespedes.css';

const API_URL = process.env.REACT_APP_API_URL;

const HuespedesList = () => {
  const [huespedes, setHuespedes] = useState([]);
  const { loading, startLoading, stopLoading } = useLoading();
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedHuespedId, setSelectedHuespedId] = useState(null);
  const navigate = useNavigate();

  // cargar huespedes
  useEffect(() => {
    const fetchHuespedes = async () => {
      startLoading();
      try {
        const data = await getHuespedes();
        //console.log('huesped:', data); //trae data
        setHuespedes(data);
      } catch (error) {
        console.error('Error al cargar huéspedes:', error);
      } finally {
        stopLoading();
      }
    };
    fetchHuespedes();
  }, []);

  const { deleteItem } = useDelete(
    `${API_URL}/huespedes`,
    'Huésped eliminado exitosamente');

  const handleAddHuesped = () => {
    navigate('/add-guest');
  };

  const handleEdit = (id) => {
    setSelectedHuespedId(id);
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    setHuespedes(huespedes.filter((huesped) => huesped?.Id_huesped !== id)); //evita error si el huesped es undef
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedHuespedId(null);
  };

  const updateHuespedInList = (updatedHuesped) => {
    setHuespedes((prev) =>
      prev.map((huesped) =>
        huesped.Id_huesped === updatedHuesped.Id_huesped ? updatedHuesped : huesped
      )
    );
  };

  return (
    <div className="container mt-5 px-2">
      <div className="mb-2 d-flex justify-content-between align-items-center">
        <h2 id="list-title">
          <i className="fas fa-user-friends me-2"></i> Lista de Huéspedes</h2>
          
      <button className="add-button btn btn-success my-3" onClick={handleAddHuesped}>
        Agregar Huésped
      </button>
      </div>    
      {
    loading ? (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
      
    ) : huespedes.length === 0 ? (
      <p className="text-center">🚫 No hay huéspedes registrados.</p>
    ) : (
      <div className="table-responsive">
        <table className="table table-borderless table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {huespedes.map((huesped) =>
              huesped && huesped.Id_huesped ? (
                <tr key={huesped.Id_huesped}>
                  <td data-label="ID">{huesped.Id_huesped}</td>
                  <td data-label="Nombre">{huesped.Nombre}</td>
                  <td data-label="Apellido">{huesped.Apellido}</td>
                  <td data-label="Dirección">{huesped.Direccion}</td>
                  <td data-label="Teléfono">{huesped.Telefono}</td>
                  <td data-label="Email">{huesped.Mail}</td>
                  <td data-label="Acciones" className="text-end">
                    <div className="btn-group" role="group" aria-label="Acciones">
                      <button
                        className="btn btn-sm btn-warning edit-button"
                        onClick={() => handleEdit(huesped.Id_huesped)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-danger delete-button"
                        onClick={() => handleDelete(huesped.Id_huesped)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>
    )
  }
  {
    showEditModal && (
      <EditarHuespedModal
        show={showEditModal}
        handleClose={closeEditModal}
        huespedId={selectedHuespedId}
        updateHuespedList={updateHuespedInList}
      />
    )
  }
    </div >
  );
}
export default HuespedesList;
