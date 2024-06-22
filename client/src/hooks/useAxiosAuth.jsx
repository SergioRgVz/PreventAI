/**
 * Axios instance for making authenticated API requests.
 * @module useAxiosAuth
 */

import axios from 'axios';

/**
 * Axios instance with default configuration.
 * @type {import('axios').AxiosInstance}
 */
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/', // Desarrollo
    // baseURL: 'http://3.93.240.154:8080/', // Producción
    headers: {
        'Content-Type': 'application/json' 
    }
}); 

/**
 * Request interceptor to add authorization token to headers.
 * @param {import('axios').AxiosRequestConfig} config - Axios request configuration.
 * @returns {import('axios').AxiosRequestConfig} - Updated Axios request configuration.
 */
apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.authorization = `${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

/**
 * Response interceptor to save authorization token from login response.
 * @param {import('axios').AxiosResponse} response - Axios response object.
 * @returns {import('axios').AxiosResponse} - Unmodified Axios response object. 
 */ 
apiClient.interceptors.response.use(function (response) {
    if (response.config.url === '/auth/login') {
        const authorizationHeader = response.headers['authorization'];
        localStorage.setItem('token', authorizationHeader);
    }
    return response;
});

export const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token del almacenamiento local
    window.location.href = '/login'; // Redirigir a la página de inicio de sesión
};

export default apiClient;
