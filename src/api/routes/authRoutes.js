/**
 * Rutas de la API para la autenticación de usuarios.
 * Este módulo define las rutas para realizar operaciones relacionadas con la autenticación,
 * incluyendo el inicio de sesión de usuarios, registro, verificación de tokens y más.
 * 
 * @module routes/authRoutes
 */

import express from 'express';
import { login, register,  getUserByEmail, verifyToken, getAllCompanies, deleteUser } from '../controllers/authController.js';

const router = express.Router();

/**
 * Ruta para el inicio de sesión de usuarios.
 * Maneja solicitudes POST para autenticar usuarios basándose en sus credenciales.
 * Espera recibir en el cuerpo de la solicitud el email y la contraseña del usuario.
 * @name post/login
 * @function
 * @memberof module:routes/authRoutes
 */
router.post('/login', login);
/**
 * Ruta para obtener un usuario por su email.
 * Maneja solicitudes GET para buscar un usuario por su email.
 * Requiere el email del usuario como parte de la ruta.
 * @name get/:id
 * @function
 * @memberof module:routes/authRoutes
 * @inner
 */
router.get('/:email', getUserByEmail);
/**
 * Ruta para el registro de nuevos usuarios.
 * Maneja solicitudes POST para crear nuevos usuarios en el sistema.
 * Recibe los datos necesarios del usuario en el cuerpo de la solicitud para su registro.
 * @name post/register
 * @function
 * @memberof module:routes/authRoutes
 */
router.post('/register', register);
/**
 * Ruta para verificar la validez de un token de autenticación.
 * Maneja solicitudes POST para verificar tokens JWT proporcionados por los usuarios.
 * Espera recibir el token de autenticación en el encabezado de la solicitud.
 * @name post/verifyToken
 * @function
 * @memberof module:routes/authRoutes
 */
router.post('/verifyToken', verifyToken);
/**
 * Ruta para obtener todas las empresas asociadas a un usuario por su ID.
 * Maneja solicitudes GET para listar empresas vinculadas al usuario autenticado.
 * Requiere el ID del usuario como parte de la ruta.
 * @name get/user/:id/companies
 * @function
 * @memberof module:routes/authRoutes
 */
router.get('/user/:id/companies', getAllCompanies);
/**
 * Ruta para eliminar un usuario por su ID.
 * Maneja solicitudes DELETE para eliminar un usuario específico del sistema.
 * Requiere el ID del usuario como parte de la ruta.
 * @name delete/:id
 * @function
 * @memberof module:routes/authRoutes
 */
router.delete('/:id', deleteUser);

export default router;
