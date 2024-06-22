/**
 * Servicio de usuario que proporciona funciones para interactuar con la base de datos de usuarios.
 * Incluye operaciones como encontrar, validar, crear y eliminar usuarios.
 * @module services/userService
 */

import bcrypt from "bcrypt";
import {User} from "../models/associations.js";
// import Company from "../models/Company.js";  // Asegúrate de exportar Company correctamente desde companyModel.js

const userService = {
  // Encuentra un usuario por su correo electrónico
  findUserByEmail: async (email) => {
    try {
      if (!email) {
        console.log("Email not provided");
        return null;
      }
      const user = await User.findOne({ where: { Correo: email } });
      return user;
    } catch (error) {
      console.error("Error finding user:", error);
      throw error;
    }
  },

  findUserById: async (id) => {
    try {
      if (!id) {
        console.log("ID not provided");
        return null;
      }
      const user = await User.findOne({ where: { ID: id } });
      return user;
    } catch (error) {
      console.error("Error finding user:", error);
      throw error;
    }
  },
  

  getUsers: async () => {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      console.error("Error getting all users:", error);
      throw error;
    }
  },

  // Valida el usuario por su correo electrónico y contraseña
  validateUser: async (email, password) => {
    try {
      const user = await userService.findUserByEmail(email);

      if (!user) {
        return 1;
      }

      const match = await bcrypt.compare(password, user.Contrasenna);
      return match ? user : 0;
    } catch (error) {
      console.error("Error validando el usuario:", error);
      throw error;
    }
  },

  // Crea un nuevo usuario
  createUser: async (DNI, email, password, name, surname, telephone, role) => {
    try {
      let user = await userService.findUserByEmail(email);
      if (user) {
        console.log("User already exists:", user);
        return null;
      }

      const hash = await bcrypt.hash(password, 10);
      user = await User.create({
        DNI: DNI,
        Correo: email,
        Contrasenna: hash,
        Nombre: name,
        Apellidos: surname,
        Telefono: telephone,
        esTecnico: role === "tecnico",
      });

      console.log("User created:", user);
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  // Elimina un usuario por su correo electrónico
  deleteUserByEmail: async (email) => {
    try {
      const user = await userService.findUserByEmail(email);
      if (!user) {
        console.log("User does not exist:", email);
        return null;
      }
      await User.destroy({ where: { Correo: email } });
      console.log("User deleted:", email);
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },

  updateUserById: async (id, updatedData) => {
    try {
      const user = await userService.getUserById(id);
      if (!user) {
        console.log("User not found:", id);
        return null;
      }
  
      // Si se proporciona una nueva contraseña, hay que cifrarla
      if (updatedData.password) {
        const hash = await bcrypt.hash(updatedData.password, 10);
        updatedData.Contrasenna = hash;
        delete updatedData.password;  // Elimina el campo password para evitar problemas
      }
  
      await User.update(updatedData, {
        where: { ID: id }
      });
  
      const updatedUser = await userService.getUserById(id);
      console.log("User updated:", updatedUser);
      return updatedUser;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  // Obtener un usuario por su ID
  getUserById: async (id) => {
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (error) {
      console.error("Error getting user by ID:", error);
      throw error;
    }
  },
  checkIfTechnician: async (id) => {
    try {
      const user = await User.findByPk(id);
      return user.esTecnico;
    } catch (error) {
      console.error("Error getting user by ID:", error);
      throw error;
    }
  }

};

export default userService;
