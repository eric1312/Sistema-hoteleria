import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAdd from '../../hooks/useAdd';
import useEdit from '../../hooks/useEdit';
import { getHuespedPorId } from '../../api/huespedesApi';

const API_URL = process.env.REACT_APP_API_URL;

const HuespedesForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [huesped, setHuesped] = useState({
        Nombre: '',
        Apellido: '',
        Direccion: '',
        Telefono: '',
        Mail: ''
    });
    const [loading, setLoading] = useState(false);

    const { addItem, error: addError } = useAdd(`${API_URL}/huespedes`, 'Huésped agregado correctamente');
    const { editItem, error: editError } = useEdit(`${API_URL}/huespedes`, 'Huésped actualizado correctamente');

    // Cargar datos para editar
    useEffect(() => {
        if (id) {
            setLoading(true);
            getHuespedPorId(id)
                .then((data) => {
                    setHuesped(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error al cargar el huésped:', error);
                    setLoading(false);
                });
        }
    }, [id]);

    // Envio del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (id) {
                // Editar si existe el ID
                await editItem(id, huesped);
            } else {
                // Crear uno nuevo si no existe el ID
                await addItem(huesped);
            }
            setLoading(false);
            navigate('/guests');
        } catch (error) {
            console.error('Error al guardar huésped:', error);
            setLoading(false);
        }
    };

    // Manejo del cambio de input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setHuesped((prevHuesped) => ({
            ...prevHuesped,
            [name]: value
        }));
    };

    if (loading)
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );

    return (
        <div>
            <form id="form-guest" onSubmit={handleSubmit}>
                <h2 id="form-title" className="text-center">
                    <i className="fas fa-user me-2"></i>
                    {id ? 'Editar Huésped' : 'Agregar Nuevo Huésped'}
                </h2>
                <div>
                    <label>Nombre</label>
                    <input
                        type="text"
                        name="Nombre"
                        placeholder="Nombre"
                        value={huesped.Nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Apellido</label>
                    <input
                        type="text"
                        name="Apellido"
                        placeholder="Apellido"
                        value={huesped.Apellido}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Dirección</label>
                    <input
                        type="text"
                        name="Direccion"
                        placeholder="Dirección"
                        value={huesped.Direccion}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Teléfono</label>
                    <input
                        type="text"
                        name="Telefono"
                        placeholder="Teléfono"
                        value={huesped.Telefono}
                        onChange={handleChange}
                    />
                </div>
                <div className="email-container">
                    <label>Email</label>
                    <input
                        type="email"
                        name="Mail"
                        placeholder="Email"
                        value={huesped.Mail}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="button-container">
                    <button type="submit" className="btn btn-success">
                        {id ? 'Actualizar' : 'Agregar'}
                    </button>
                </div>
            </form>

            {addError && <div className="alert alert-danger">{addError}</div>}
            {editError && <div className="alert alert-danger">{editError}</div>}
        </div>
    );
};

export default HuespedesForm;

