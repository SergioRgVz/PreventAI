import axios from 'axios';

export const loginUser = async (email, password) => {
    try {
        const { data } = await axios.post('/auth/login', { email, password });
        // console.log('Login exitoso:', response.data);
        console.log('Login exitoso:');
        localStorage.setItem('token', data.token);
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
        const response = await axios.post('/auth/register', { email, password, name, surname, telephone });
        console.log('Registro exitoso:', response.data);
        return response.data;
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

// Función para verificar el token
export const verifyToken = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('No hay token disponible');
            return false;
        }

        // Realiza la petición al endpoint de verificación
        const response = await axios.post('/auth/verifyToken', {
            headers: {
                'Authorization': token
            }
        });

        // Manejo de la respuesta
        console.log('Token verificado con éxito', response.data);
        return true;
    } catch (error) {
        // Manejo del error
        console.error('Error al verificar el token', error.response ? error.response.data : error.message);
        return false;
    }
};

