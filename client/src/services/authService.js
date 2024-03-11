import apiClient from '../hooks/useAxiosAuth'; // Import the Axios hook

export const loginUser = async (email, password) => {
  try {
    const { data } = await apiClient.post('/auth/login', { email, password });
    console.log("Respuesta login: ", data);
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
    console.log('Registro exitoso:', response.data);
    return response.data;
  } catch (error) {
    // Handle error response similarly to loginUser
    // ... (code as in loginUser's catch block)
  }
};

// export const  = async () => {
//   try {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       console.log('No hay token disponible');
//       return false;
//     }

//     const response = await apiClient.post('/auth/'); // Use apiClient for token verification

//     // Handle successful verification response (if applicable)
//     // ... (optional code)

//     return true;
//   } catch (error) {
//     console.error('Error al verificar el token', error.response ? error.response.data : error.message);
//     return false;
//   }
// };