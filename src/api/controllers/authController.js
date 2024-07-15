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

    if (!email || !password) {
      return res.status(400).json({ code: 400, message: 'Faltan credenciales de inicio de sesión' });
    }

    const user = await userService.validateUser(email, password);
    if (!user) {
      return res.status(401).json({ message: 'Credenciales de inicio de sesión inválidas' });
    }

    const token = jwt.sign({ userId: user.ID }, process.env.SECRET_KEY_JWT, { expiresIn: '24h' });
    res.setHeader('authorization', 'Bearer ' + token);
    return res.status(200).json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

/**
 * Obtiene un usuario por su email.
 * @param {Object} req - Objeto de solicitud Express. 
 * @param {Object} res - Objeto de respuesta Express. 
 * @returns Un objeto JSON con el usuario encontrado o un mensaje de error si no se encuentra.
 */
export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    if (email === undefined) return res.status(400).json({ code: 400, message: 'Falta el email del usuario' });

    const user = await userService.findUserByEmail(email);

    if (user === null) {
      return res.status(404).json({ code: 404, message: 'Usuario no encontrado' });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const checkIfTechnician = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await userService.findUserById(userId);
    if (user === null) {
      return res.status(404).json({ code: 404, message: 'Usuario no encontrado' });
    }
    return res.status(200).json({ isTechnician: user.role !== 1 });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

/**
 * Verifica el token JWT para la autenticación.
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @param {Function} next - Función para pasar al siguiente middleware.
 */
export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Encabezado de autorización inválido o ausente' });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY_JWT, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Token inválido' });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    console.error('Error en la verificación del token:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const userId = req.user.userId;
    const esTecnico = await userService.checkIfTechnician(userId);
    if (!esTecnico) {
      const users = await userService.getUsers();
      return res.status(200).json(users);
    } else {
      return res.status(403).json({ message: 'No tienes permisos para realizar esta acción' });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

/**
 * Registra un nuevo usuario en el sistema.
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 */
export const register = async (req, res) => {
  try {
    const { DNI, email, password, name, surname, telephone, role } = req.body;
    const esTecnico = role == 'administrador' ? 0 : 1;
    const user = await userService.createUser(DNI, email, password, name, surname, telephone, esTecnico);

    if (user === null) {
      return res.status(409).json({ message: 'El usuario ya existe' });
    }

    // Generar el token JWT
    const token = jwt.sign({ userId: user.ID }, process.env.SECRET_KEY_JWT, { expiresIn: '365d' });
    res.setHeader('authorization', 'Bearer ' + token);

    return res.status(200).json({ message: 'Usuario creado', token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedUser = await userService.updateUserById(id, updatedData);
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    return res.status(200).json({ message: 'Usuario actualizado', user: updatedUser });
  } catch (error) {
    console.error('Error actualizando el usuario:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};


/**
 * Elimina un usuario por su email.
 * @param {Object} req - Objeto de solicitud Express, contiene parámetros de la ruta.
 * @param {Object} res - Objeto de respuesta Express.
 */
export const deleteUser = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await userService.deleteUserByEmail(email);
    if (user === null) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    return res.status(200).json({ message: 'Usuario eliminado' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
