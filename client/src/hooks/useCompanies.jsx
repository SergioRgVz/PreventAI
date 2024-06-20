// useCompanies.js
import apiClient from './useAxiosAuth';

export const getCompanies = async () => {
  const response = await apiClient.get('/company');
  // console.log("response.data.companies", response.data.companies);
  // console.log("Municipio de la mepresa", response.data.companies[0].Municipio.Nombre);
  if (!response.data.companies) return [];

  return response.data.companies;
}

export const getCompanyByCIF = async (CIF) => {
  const response = await apiClient.get(`/company/cif/${CIF}`);
  return response.data.company;
}

export const getEmployees = async (ID) => {
  console.log("Obteniendo empleados de la empresa con ID: ", ID);
  const response = await apiClient.get(`/employee/company/${ID}/employees`);
  console.log("getEmployees front: ", response.data);
  return response.data;
}

export const createCompany = async (formData) => {
  console.log("Creando empresa con datos: ", formData);
  const response = await apiClient.post('/company/', formData);
  return response.data;
}

export const updateCompany = async (CIF, formData) => {
  
  const response = await apiClient.put(`/company/cif/${CIF}`, {ID_Municipio: formData.municipio, nombre: formData.Nombre, CIF: formData.CIF});
  return response.data;
}

export const deleteCompany = async (CIF) => {
  
  console.log("ELiminando empresa con CIF: ", CIF);
  const response = await apiClient.delete('/company/deleteCompany', {
    data: { companyId: CIF }
  });
return response.data;
}

export const companyService = {
  getCompanies,
  getCompanyByCIF,
  getEmployees,
  createCompany,
  updateCompany,
  deleteCompany
};