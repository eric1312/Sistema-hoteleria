import axios from 'axios';


const API_URL = process.env.REACT_APP_API_URL;

// obtiene todos los huespedes
export const getHuespedes = async () => {
  try {
    const response = await axios.get(`${API_URL}/huespedes`);
    return response.data; // retorna data
  } catch (error) {
    console.error('Error al obtener huespedes:', error);
    throw error; // maneja error
  }
};

// obtieneun huesped por ID
export const getHuespedPorId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/huespedes/${id}`);
    return response.data; //retorna la data
  } catch (error) {
    console.error(`Error al obtener el huesped con ID ${id}:`, error);
    throw error; 
  }
};

// crea un nuevo huesped
export const createHuesped = async (huespedData) => {
  try {
    const response = await axios.post(`${API_URL}/huespedes`, huespedData);
    return response.data; // retorna data
  } catch (error) {
    console.error('Error al crear huesped:', error);
    throw error; 
  }
};

// actualiza un huesped
export const updateHuesped = async (id, huespedData) => {
  try {
    const response = await axios.patch(`${API_URL}/huespedes/${id}`, huespedData);
    return response.data; // retorna data
  } catch (error) {
    console.error(`Error al actualizar el huesped con ID ${id}:`, error);
    throw error; 
  }
};

// elimina un huesped por su ID
export const deleteHuesped = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/huespedes/${id}`);
    return response.data; // retorna data
  } catch (error) {
    console.error(`Error al eliminar el huesped con ID ${id}:`, error);
    throw error; 
  }
};

