/**
 * Servicio de usuario que proporciona funciones para interactuar con la base de datos de usuarios.
 * Incluye operaciones como encontrar, validar, crear y eliminar usuarios.
 * @module services/userService
 */


import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import Company from '../models/companyModel.js';

const userService = {
  /**
   * Encuentra un usuario por email.
   * @param {string} email - El email del usuario a encontrar.
   * @returns {Promise<User|null>} El usuario encontrado o null si no se encuentra.
   */
  findUser: async (email) => {
    try {
      const user = await User.findOne({ email }).exec(); 
      return user;
    } catch (error) {
        return null;
    }
  },
  
  /**
   *  Obtiene un usuario por su email.
   * @param {string} email  - Email del usuario a buscar.
   * @returns  {Promise<User|null>} El usuario encontrado o null si no se encuentra.
   */
  getUserByEmail: async (email) => {
    try {
        const user = await User.findOne({ email }).exec();
        return user;
    } catch (error) {
        return null;
    }
  },
  /**
   * Valida un usuario comprobando su email y contraseña.
   * @param {string} email - Email del usuario.
   * @param {string} password - Contraseña del usuario para validar.
   * @returns {Promise<User|number>} El usuario validado o un código de error si no se valida.
   */
  validateUser: async (email, password) => {
    try {
      let user = await userService.findUser(email);

      if (!user) {
        return 1;
      }
      const match = await bcrypt.compare(password, user.password);
      return match ? user : 0; //If the password matches, return the user, else return 0

    } catch (error) {
      console.error('Error validando el usuario:', error);
      throw error;
    }
  },
  /**
   * Crea un nuevo usuario en la base de datos.
   * @param {string} email - Email del usuario.
   * @param {string} password - Contraseña del usuario.
   * @param {string} name - Nombre del usuario.
   * @param {string} surname - Apellido del usuario.
   * @param {string} telephone - Teléfono del usuario.
   * @param {string} role - Rol del usuario.
   * @returns {Promise<User|null>} El usuario creado o null si el usuario ya existe.
   */
  createUser: async (email, password, name, surname, telephone, role) => {
    try { 
      let user = await userService.findUser(email);
      if (user) {
        console.log('User already exists:', user);
        return null;
      }

      const hash = await bcrypt.hash(password, 10);
      user = await User.create({ email: email, password: hash, name: name, surname: surname, telephone: telephone, role: role });
      
      console.log('User created:', user);
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },
  /**
   * Obtiene las compañías asociadas a un usuario por su ID.
   * @param {string} id - ID del usuario para buscar sus compañías.
   * @returns {Promise<Array>|null} Las compañías del usuario o null si el usuario no existe.
   */
  getCompaniesByUserId: async (id) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        console.log('User does not exist with id:', id);
        return null;
      }
      const companies = await Company.find({ User: id });
      return companies;
    } catch (error) {
      console.error('Error getting companies by user id:', error);
      throw error;
    }
  },
  /**
   * Elimina un usuario por su email.
   * @param {string} email - Email del usuario a eliminar.
   * @returns {Promise<void>} Una promesa que se resuelve cuando el usuario es eliminado.
   */
  deleteUser: async (email) => {
    try {
      const user = await userService.findUser(email);
      if (!user) {
        console.log('User does not exist:', user);
        return null;
      }
      await User.deleteOne({ email: email }).exec();
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },
  /**
   * Elimina un usuario por su ID.
   * @param {string} id - ID del usuario a eliminar.
   * @returns {Promise<User|null>} El usuario eliminado o null si no se encuentra.
   */
  deleteUserById: async (id) => {
    try {
        // Buscar el usuario por ID para verificar si existe
        const user = await User.findById(id);
        if (!user) {
            console.log('Usuario no existe con id:', id);
            return null;
        }
        // Eliminar el usuario por ID
        await User.deleteOne({ _id: id }).exec();
        return user; // Retornar el usuario eliminado como confirmación
    } catch (error) {
        console.error('Error eliminando el usuario:', error);
        throw error;
    }
}

};

export default userService;
