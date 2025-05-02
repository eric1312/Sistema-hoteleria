import axios from 'axios';


const API_URL = process.env.REACT_APP_API_URL;

// obtengo todos los empleados
export const getEmployees = async () => {
  try {
    const response = await axios.get(`${API_URL}/empleados`);
    return response.data; // retorna data
  } catch (error) {
    console.error('Error al obtener empleados:', error);
    throw error; // maneja error
  }
};

// obtengo un empleado por ID
export const getEmployeeById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/empleados/${id}`);
    return response.data; //retorna la data
  } catch (error) {
    console.error(`Error al obtener el empleado con ID ${id}:`, error);
    throw error; 
  }
};

// crea un nuevo empleado
export const createEmployee = async (employeeData) => {
  try {
    const response = await axios.post(`${API_URL}/empleados`, employeeData);
    return response.data; // retorna data
  } catch (error) {
    console.error('Error al crear empleado:', error);
    throw error; 
  }
};

// actualiza un empleado
export const updateEmployee = async (id, employeeData) => {
  try {
    const response = await axios.patch(`${API_URL}/empleados/${id}`, employeeData);
    return response.data; // retorna data
  } catch (error) {
    console.error(`Error al actualizar el empleado con ID ${id}:`, error);
    throw error; 
  }
};

// elimina un empleado por su ID
export const deleteEmployee = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/empleados/${id}`);
    return response.data; // retorna data
  } catch (error) {
    console.error(`Error al eliminar el empleado con ID ${id}:`, error);
    throw error; 
  }
};

