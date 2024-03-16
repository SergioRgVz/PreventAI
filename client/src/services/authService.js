import apiClient from '../hooks/useAxiosAuth'; // Import the Axios hook

export const loginUser = async (email, password) => {
  try {
    const { data } = await apiClient.post('/auth/login', { email, password });
    return data; // Return response data for potential user information
  } catch (error) {
    if (error.response) {
      throw {
        status: error.response.status,
        message: error.response.data.message,
      };
    } else if (error.request) {
      throw {
        status: 0,
        message: 'La petición fue hecha pero no se recibió respuesta',
      };
    } else {
      throw {
        status: 0,
        message: 'Error desconocido en la petición',
      };
    }
  }
};

export const registerUser = async (email, password, name, surname, telephone) => {
  try {
    const response = await apiClient.post('/auth/register', { email, password, name, surname, telephone });
    return response.data;
  } catch (error) {
    // Handle error response similarly to loginUser
    // ... (code as in loginUser's catch block)
  }
};