/**
 * Controlador de autenticación que maneja el inicio de sesión y registro de usuarios.
 * @module controllers/authController
 */

import userService from '../services/userService.js';
import jwt from 'jsonwebtoken';

/**
 * Maneja el inicio de sesión de los usuarios.
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.validateUser(email, password);
        if (user === 0) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        if (user === 1) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        console.log(user);
        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY_JWT, { expiresIn: '24h' });
        return res.status(200).json({ message: 'success', token });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

/**
 * Obtiene un usuario por su email.
 * @param {Object} req - Objeto de solicitud Express. 
 * @param Object} - Objeto de respuesta Express. 
 * @returns Un objeto JSON con el usuario encontrado o un mensaje de error si no se encuentra.
 */
export const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await userService.getUserByEmail(email);
        if (user === null) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        console.log(user);
        return res.status(200).json(user);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}
/**
 * Verifica el token de autenticación del usuario.
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @param {Function} next - Callback para continuar con el siguiente middleware.
 */
export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(403).send('Se requiere un token para autenticación');

    jwt.verify(token, process.env.SECRET_KEY_JWT, (err, decoded) => {
        if (err) return res.status(401).send('Token inválido');
        req.userId = decoded.userId;
        res.status(200).send('Token válido');
        next();
    });
};

/**
 * Registra un nuevo usuario en el sistema.
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 */
export const register = async (req, res) => {
    try {
        const { email, password, name, surname, telephone } = req.body;
        const user = await userService.createUser(email, password, name, surname, telephone, 'technician');
        if (user === null) {
            return res.status(409).json({ message: 'El usuario ya existe' });
        }
        return res.status(201).json({ message: 'Usuario creado', user });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}
/**
 * Obtiene todas las compañías asociadas a un usuario por su ID.
 * @param {Object} req - Objeto de solicitud Express, contiene parámetros de la ruta.
 * @param {Object} res - Objeto de respuesta Express.
 */
export const getAllCompanies = async (req, res) => {
    try {
        const { id } = req.params;
        const companies = await userService.getCompaniesByUserId(id);
        if (companies === null) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        return res.status(200).json(companies);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

/**
 * Elimina un usuario por su ID.
 * @param {Object} req - Objeto de solicitud Express, contiene parámetros de la ruta.
 * @param {Object} res - Objeto de respuesta Express.
 */
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.deleteUserById(id);
        if (user === null) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        return res.status(200).json({ message: 'Usuario eliminado', user });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}