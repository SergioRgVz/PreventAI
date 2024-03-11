// useCompanies.js
import apiClient from './useAxiosAuth';

export const getCompanies = async () => {
  const response = await apiClient.get('/company');
  console.log("getCompanies", response );
  return response.data.companies;
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
  const response = await apiClient.delete(`/company/delete/${CIF}`);
  return response.data;
}

export const companyService = {
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompany
};