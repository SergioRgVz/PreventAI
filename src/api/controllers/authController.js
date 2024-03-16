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

    // Validate user credentials
    const user = await userService.validateUser(email, password);
    if (!user) {
      return res.status(401).json({ message: 'Invalid login credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY_JWT, { expiresIn: '24h' });
    res.setHeader('authorization', 'Bearer '+ token);
    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

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
    return res.status(200).json(user);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Invalid or missing authorization header' });
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.SECRET_KEY_JWT, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
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