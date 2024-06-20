// Asumiendo que puedes importar los JSON directamente

import apiClient from '../hooks/useAxiosAuth';

export const getProvincias = async () => {
  const response = await apiClient.get('/provincia');
  return response.data;
};

export const getAllMunicipiosInProvincia = async (provinciaId) => {
  const response = await apiClient.get(`/municipio/provincia/${provinciaId}`);
  console.log("response.data", response.data);

  return response.data;
}


export const getProvinciaById = async (provinciaId) => {
  const response = await apiClient.get(`/provincia/${provinciaId}`);
  return response.data;
};

export const getMunicipios = async () => {
  const response = await apiClient.get('/municipio');
  return response.data;
};
