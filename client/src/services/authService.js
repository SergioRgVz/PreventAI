import axios from 'axios';

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:8080/auth/login', { email, password });
        console.log('Login exitoso:', response.data);
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

export const registerUser = async (email, password, name, surname, telephone) => {
    try {
        const response = await axios.post('http://localhost:8080/auth/register', { email, password, name, surname, telephone });
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
