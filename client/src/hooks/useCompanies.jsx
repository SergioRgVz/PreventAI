// useCompanies.js
import apiClient from './useAxiosAuth';

export const getCompanies = async () => {
  const response = await apiClient.get('/company');
  return response.data.companies;
}

export const getEmployees = async (CIF) => {
  const response = await apiClient.get(`/company/getEmployees/${CIF}`);
  return response.data.employees;
}

export const createCompany = async (formData) => {
  const response = await apiClient.post('/company/create', formData);
  return response.data;
}

export const updateCompany = async (CIF, formData) => {
  const response = await apiClient.put(`/company/update/${CIF}`, formData);
  return response.data;
}

export const deleteCompany = async (CIF) => {
  console.log("ELiminando empresa con CIF: ", CIF);
  const response = await apiClient.delete(`/company/delete/${CIF}`);
  return response.data;
}

export const companyService = {
  getCompanies,
  getEmployees,
  createCompany,
  updateCompany,
  deleteCompany
};