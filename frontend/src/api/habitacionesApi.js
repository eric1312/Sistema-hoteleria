import axios from 'axios';


const API_URL = process.env.REACT_APP_API_URL;

// obtengo todas las habitaciones
export const getHabitaciones = async () => {
  try {
    const response = await axios.get(`${API_URL}/habitaciones`);
    return response.data; // retorna data
  } catch (error) {
    console.error('Error al obtener las habitaciones:', error);
    throw error; 
  }
};

// obtengo habitacion x id
export const getHabitacionPorId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/habitaciones/${id}`);
    return response.data; // // retorna data
  } catch (error) {
    console.error(`Error al obtener las habitacion con ID ${id}:`, error);
    throw error; 
  }
};

// crea una nueva habitacion
export const createHabitacion = async (habitacionData) => {
  try {
    const response = await axios.post(`${API_URL}/habitaciones`, habitacionData);
    return response.data; // // retorna data nuevo empleado
  } catch (error) {
    console.error('Error al crear habitacion:', error);
    throw error; 
  }
};

// actualiza una habitacion
export const updateHabitacion = async (id, habitacionData) => {
  try {
    const response = await axios.patch(`${API_URL}/habitaciones/${id}`, habitacionData);
    return response.data; // // retorna data empleado actualizado
  } catch (error) {
    console.error(`Error al actualizar la habitacion con ID ${id}:`, error);
    throw error; 
};
}

// elimina un habitacion por su ID
export const deleteHabitacion = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/habitaciones/${id}`);
    return response.data; // retorna data
  } catch (error) {
    console.error(`Error al eliminar la habitacion con ID ${id}:`, error);
    throw error; 
  }
};
