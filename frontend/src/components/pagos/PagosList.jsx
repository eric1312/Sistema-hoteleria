import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPagos } from '../../api/pagosApi';
import EditarPagoModal from './EditarPagoModal';
import useLoading from '../../hooks/useLoading';
import useDelete from '../../hooks/useDelete';
import '../../styles/Pagos.css';

const API_URL = process.env.REACT_APP_API_URL;

const PagosList = () => {
  const [pagos, setPagos] = useState([]);
  const { loading, startLoading, stopLoading } = useLoading();
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPagoId, setSelectedPagoId] = useState(null);
  const navigate = useNavigate();

  // Cargar pagos
  useEffect(() => {
    const fetchPagos = async () => {
      startLoading();
      try {
        const data = await getPagos();
        setPagos(data);
      } catch (error) {
        console.error('Error al cargar pagos:', error);
      } finally {
        stopLoading();
      }
    };
    fetchPagos();
  }, []);

  const { deleteItem } = useDelete(
    `${API_URL}/pagos`,
    'Pago eliminado exitosamente'
  );

  const handleAddPago = () => {
    navigate('/add-payment');
  };

  const handleEdit = (id) => {
    setSelectedPagoId(id);
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    setPagos(pagos.filter((pago) => pago.Id_pago !== id));
  };

  const updatePagosList = () => {
    const fetchPagos = async () => {
      startLoading();
      try {
        const data = await getPagos();
        setPagos(data);
      } catch (error) {
        console.error('Error al cargar pagos:', error);
      } finally {
        stopLoading();
      }
    };
    fetchPagos();
  };

  return (
    <div className="container mt-5 px-2">
      <div className="mb-2 d-flex justify-content-between align-items-center">
        <h2 id="list-title">
          <i className="fas fa-money-bill-wave me-2"></i> Lista de Pagos
        </h2>
        <button className="add-button btn btn-success my-3"  onClick={handleAddPago}>
          Agregar Pago
        </button>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : pagos.length === 0 ? (
        <p>No hay pagos registrados.</p>
      ) : (
        <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>ID Reserva</th>
              <th>Fecha Pago</th>
              <th>Monto Pago</th>
              <th>Método Pago</th>
              <th>ID Empleado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pagos.map((pago) => (
              <tr key={pago.Id_pago}>
                <td>{pago.Id_reserva}</td>
                <td>{pago.Fecha_pago}</td>
                <td>{pago.Monto_pago}</td>
                <td>{pago.Metodo_pago}</td>
                <td>{pago.Id_empleado}</td>
                <td>
                  <button
                     className="btn btn-sm btn-warning edit-button"
                    onClick={() => handleEdit(pago.Id_pago)}
                  >
                        <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-danger delete-button"
                    onClick={() => handleDelete(pago.Id_pago)}
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


      <EditarPagoModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        pagoId={selectedPagoId}
        updatePagosList={updatePagosList}
      />
    </div>

  );
};

export default PagosList;
