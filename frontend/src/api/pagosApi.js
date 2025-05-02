import axios from 'axios';


const API_URL = process.env.REACT_APP_API_URL;

// obtiene todos los pagos
export const getPagos = async () => {
  try {
    const response = await axios.get(`${API_URL}/pagos`);
    return response.data; // retorna data
  } catch (error) {
    console.error('Error al obtener pagos:', error);
    throw error; // maneja error
  }
};

// obtieneun pagos por ID
export const getPagoPorId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/pagos/${id}`);
    return response.data; //retorna la data
  } catch (error) {
    console.error(`Error al obtener el pagos con ID ${id}:`, error);
    throw error; 
  }
};

// crea un nuevo pagos
export const createPago= async (pagoData) => {
  try {
    const response = await axios.post(`${API_URL}/pagos`, pagoData);
    return response.data; // retorna data
  } catch (error) {
    console.error('Error al crear pagos:', error);
    throw error; 
  }
};

// actualiza un pago
export const updatePago = async (id, pagoData) => {
  try {
    const response = await axios.patch(`${API_URL}/pagos/${id}`, pagoData);
    return response.data; // retorna data
  } catch (error) {
    console.error(`Error al actualizar el pagos con ID ${id}:`, error);
    throw error; 
  }
};

// elimina un pago por su ID
export const deletePago = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/pagos/${id}`);
    return response.data; // retorna data
  } catch (error) {
    console.error(`Error al eliminar el pagos con ID ${id}:`, error);
    throw error; 
  }
};

