import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmployees } from '../../api/empleadosApi';
import EditarEmpleadoModal from './EditarEmpleadoModal';
import useLoading from '../../hooks/useLoading'; // Importar el hook de carga
import useDelete from '../../hooks/useDelete';
import '../../styles/Empleados.css';


const API_URL = process.env.REACT_APP_API_URL;

const EmpleadosList = () => {
    const [employees, setEmployees] = useState([]);
    const { loading, startLoading, stopLoading } = useLoading();
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null); // almaceno el id del seleccionado
    const navigate = useNavigate();

    // usamos hook para obtener empleados
    useEffect(() => {
        const fetchEmployees = async () => {
            startLoading();
            try {
                const data = await getEmployees();
                setEmployees(data);
            } catch (error) {
                console.error('Error al cargar empleados:', error);
            } finally {
                stopLoading();
            }
        };
        fetchEmployees();
    }, []);

    const { deleteItem } = useDelete(`${API_URL}/empleados`, 'Empleado eliminado exitosamente');

    const handleAddEmployee = () => {
        navigate('/add-employee');
    };

    const handleEdit = (id) => {
        setSelectedEmployeeId(id);
        setShowEditModal(true);
    };

    const handleDelete = async (id) => {
        await deleteItem(id); //  hook para eliminar
        setEmployees(employees.filter((employee) => employee.Id_empleado !== id)); // actualizamos
    };
    // función actualizar
    const updateEmployeeList = () => {
        const fetchEmployees = async () => {
            startLoading();
            try {
                const data = await getEmployees();
                setEmployees(data);
            } catch (error) {
                console.error('Error al cargar empleados:', error);
            } finally {
                stopLoading();
            }
        };
        fetchEmployees();
    };

    return (
        <div className="container mt-5 px-2">

            <div className="mb-2 d-flex justify-content-between align-items-center">
                <h2>
                    <i class="fas fa-users me-2"></i>
                    Lista de Empleados
                </h2>
                <button className="add-button btn btn-success my-3" onClick={handleAddEmployee}>
                    Agregar Empleado
                </button>
            </div>

            {loading ? (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            ) : employees.length === 0 ? (
                <p>No hay empleados registrados.</p>
            ) : (
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Cargo</th>
                                <th>Teléfono</th>
                                <th>Email</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (
                                <tr key={employee.Id_empleado}>
                                    <td data-label="ID">{employee.Id_empleado}</td>
                                    <td data-label="Nombre">{employee.Nombre}</td>
                                    <td data-label="Apellido">{employee.Apellido}</td>
                                    <td data-label="Cargo">{employee.Cargo}</td>
                                    <td data-label="Teléfono">{employee.Telefono}</td>
                                    <td data-label="Email">{employee.Email}</td>
                                    <td>
                                        <button
                                             className="btn btn-sm btn-warning edit-button"
                                            onClick={() => handleEdit(employee.Id_empleado)}
                                        >
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger delete-button"
                                            onClick={() => handleDelete(employee.Id_empleado)}
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

            {/* Modal de Edición */}
            <EditarEmpleadoModal
                show={showEditModal}
                handleClose={() => setShowEditModal(false)}
                employeeId={selectedEmployeeId}
                updateEmployeeList={updateEmployeeList}
            />
        </div>
    );

};

export default EmpleadosList;

