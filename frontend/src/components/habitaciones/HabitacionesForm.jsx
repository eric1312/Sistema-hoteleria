import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAdd from '../../hooks/useAdd';  
import useEdit from '../../hooks/useEdit'; 
import { getHabitacionPorId } from '../../api/habitacionesApi'; 
import '../../styles/Habitaciones.css';

const API_URL = process.env.REACT_APP_API_URL;

const HabitacionForm = () => {
    const { id } = useParams();  
    const navigate = useNavigate();
    const [habitacion, setHabitacion] = useState({
        Num_habitacion: '',
        Tipo_habitacion: 'Simple',
        Precio_noche: '',
        Estado: 'Disponible'
    });
    const [loading, setLoading] = useState(false);

    const { addItem,  error: addError } = useAdd(`${API_URL}/habitaciones`, 'Habitacion agregada correctamente');
    const { editItem,  error: editError } = useEdit(`${API_URL}/habitaciones`, 'Habitacion actualizado correctamente');

    useEffect(() => {
        if (id) { 
            setLoading(true);
            getHabitacionPorId(id)
                .then((data) => {
                    setHabitacion(data); 
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error al cargar la habitación:', error);
                    setLoading(false);
                });
        }
    }, [id]);

    // envio data
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // A precio_noche  parsear a float y num_habitacion a entero
        const habitacionData = {
            ...habitacion,
            Num_habitacion: parseInt(habitacion.Num_habitacion, 10),  // conv entero
            Precio_noche: parseFloat(habitacion.Precio_noche) || 0  // conv numero flotant
        };

        try {
            if (id) {
                
                await editItem(id, habitacionData);
            } else {
                
                await addItem(habitacionData);
            }
            setLoading(false);
            navigate('/rooms');  
        } catch (error) {
            console.error('Error al guardar la habitación:', error);
            setLoading(false);
        }
    };

    // manipulo cambios en los campos
    const handleChange = (e) => {
        const { name, value } = e.target;
        setHabitacion((prevHabitacion) => ({
            ...prevHabitacion,
            [name]: value
        }));
    };

    if (loading) return (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
    );

    return (
        <div>
         
            <form id='form-habitaciones' onSubmit={handleSubmit}>
            <h2 className="text-center mb-4"><i className="fas fa-bed me-3"></i> Datos de la Habitación            
            </h2>
                <div>
                    <label>Número de Habitación</label>
                    <input
                        type="number" 
                        name="Num_habitacion"
                        value={habitacion.Num_habitacion}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Tipo de Habitación</label>
                    <select
                        name="Tipo_habitacion"
                        value={habitacion.Tipo_habitacion}
                        onChange={handleChange}
                    >
                        <option value="Simple">Simple</option>
                        <option value="Doble">Doble</option>
                        <option value="Suite">Suite</option>
                        <option value="Familiar">Familiar</option>
                    </select>
                </div>
                <div>
                    <label>Precio por Noche</label>
                    <input
                        type="number" 
                        name="Precio_noche"
                        value={habitacion.Precio_noche}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Estado</label>
                    <select
                        name="Estado"
                        value={habitacion.Estado}
                        onChange={handleChange}
                    >
                        <option value="Disponible">Disponible</option>
                        <option value="Ocupada">Ocupada</option>
                        <option value="A confirmar">A confirmar</option>
                    </select>
                </div>
                <button type="submit">{id ? 'Actualizar' : 'Agregar'}</button>
            </form>

            {addError && <div>{addError}</div>}
            {editError && <div>{editError}</div>}
        </div>
    );
};

export default HabitacionForm;
