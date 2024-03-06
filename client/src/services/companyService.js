// services/companyService.js
import axios from 'axios';

export async function updateCompanyData(CIF, formData) {
  try {
    await axios.put(`/company/update/${CIF}`, formData);
    // Manejo adicional si es necesario, como notificaciones de éxito
  } catch (error) {
    console.error('Error al actualizar la empresa', error.response ? error.response.data : error);
    throw error; // Propagar el error para manejarlo en el componente
  }
}
