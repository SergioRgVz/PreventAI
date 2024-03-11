// useEmployees.js
import apiClient from './useAxiosAuth';

export const getEmployees = async () => {
  const response = await apiClient.get('/employee');
  console.log("getEmployees", response );
  return response.data.employees;
}

// export const createCompany = async (formData) => {
//   const response = await apiClient.post('/company/create', formData);
//   return response.data;
// }

// export const updateCompany = async (CIF, formData) => {
//   const response = await apiClient.put(`/company/update/${CIF}`, formData);
//   return response.data;
// }

// export const deleteCompany = async (CIF) => {
//   const response = await apiClient.delete(`/company/delete/${CIF}`);
//   return response.data;
// }

export const employeeService = {
  getEmployees,
  // createCompany,
  // updateCompany,
  // deleteCompany
};