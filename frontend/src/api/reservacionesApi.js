import axios from 'axios';


const API_URL = process.env.REACT_APP_API_URL;

// obtengo todos los reservas
export const getReservas= async () => {
  try {
    const response = await axios.get(`${API_URL}/reservas`);
    return response.data; // retorna data
  } catch (error) {
    console.error('Error al obtener reservas:', error);
    throw error; // maneja error
  }
};

// obtengo un reserva por ID
export const getReservaPorId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/reservas/${id}`);
    return response.data; //retorna la data
  } catch (error) {
    console.error(`Error al obtener el reserva con ID ${id}:`, error);
    throw error; 
  }
};

// crea un nuevo reserva
export const createReserva = async (employeeData) => {
  try {
    const response = await axios.post(`${API_URL}/reservas`, employeeData);
    return response.data; // retorna data
  } catch (error) {
    console.error('Error al crear reserva:', error);
    throw error; 
  }
};

// actualiza un reserva
export const updateReserva = async (id, employeeData) => {
  try {
    const response = await axios.patch(`${API_URL}/reservas/${id}`, employeeData);
    return response.data; // retorna data
  } catch (error) {
    console.error(`Error al actualizar el reserva con ID ${id}:`, error);
    throw error; 
  }
};

// elimina un reserva por su ID
export const deleteReserva = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/reservas/${id}`);
    return response.data; // retorna data
  } catch (error) {
    console.error(`Error al eliminar el reserva con ID ${id}:`, error);
    throw error; 
  }
};

