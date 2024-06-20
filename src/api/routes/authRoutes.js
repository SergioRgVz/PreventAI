/**
 * Rutas de la API para la autenticación de usuarios.
 * Este módulo define las rutas para realizar operaciones relacionadas con la autenticación,
 * incluyendo el inicio de sesión de usuarios, registro, verificación de tokens y más.
 * 
 * @module routes/authRoutes
 */

import express from 'express';
import { login, checkIfTechnician, register, getUserByEmail, getAllUsers, updateUser, deleteUser, verifyToken } from '../controllers/authController.js';

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

router.get('/check-role', verifyToken, checkIfTechnician);

/**
 * Ruta para obtener un usuario por su email.
 * Maneja solicitudes GET para buscar un usuario por su email.
 * Requiere el email del usuario como parte de la ruta.
 * @name get/:email
 * @function
 * @memberof module:routes/authRoutes
 * @inner
 */
router.get('/email/:email', getUserByEmail);

router.get('/users', getAllUsers);

/**
 * Ruta para el registro de nuevos usuarios.
 * Maneja solicitudes POST para crear nuevos usuarios en el sistema.
 * Recibe los datos necesarios del usuario en el cuerpo de la solicitud para su registro.
 * @name post/register
 * @function
 * @memberof module:routes/authRoutes
 */
router.post('/register', register);


router.put('/users/:id', updateUser);

/**
 * Ruta para eliminar un usuario por su email.
 * Maneja solicitudes DELETE para eliminar un usuario específico del sistema.
 * Requiere el email del usuario como parte de la ruta.
 * @name delete/email/:email
 * @function
 * @memberof module:routes/authRoutes
 */
router.delete('/email/:email', deleteUser);

export default router;
