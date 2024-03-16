// useEmployees.js
import apiClient from './useAxiosAuth';

export const getEmployees = async () => {
  const response = await apiClient.get('/employee');
  return response.data.employees;
}

export const createEmployee = async (formData) => {
  const response = await apiClient.post('/employee/create', formData);
  return response.data;
}

export const updateEmployee = async (DNI, formData) => {
  const response = await apiClient.put(`/employee/update/${DNI}`, formData);
  return response.data;
}

export const deleteEmployee = async (DNI) => {
  const response = await apiClient.delete(`/employee/${DNI}`);
  return response.data;
}

export const employeeService = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
};