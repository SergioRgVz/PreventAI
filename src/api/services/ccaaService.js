import {CCAA} from "../models/associations.js";

const ccaaService = {
  // Función para crear una nueva CCAA
  createCCAA: async (nombre) => {
    try {
      const newCCAA = await CCAA.create({ Nombre: nombre });
      console.log("CCAA creada:", newCCAA);
      return newCCAA;
    } catch (error) {
      console.error("Error al crear CCAA:", error);
      throw error;
    }
  },

  // Función para obtener todas las CCAA
  getAllCCAA: async () => { 
    try {
      const ccaas = await CCAA.findAll();
      console.log("Todas las CCAA:", ccaas);
      return ccaas;
    } catch (error) {
      console.error("Error al obtener todas las CCAA:", error);
      throw error;
    }
  },

  // Función para obtener una CCAA por su ID
  getCCAAById: async (id) => {
    try {
      const ccaa = await CCAA.findByPk(id);
      if (!ccaa) {
        console.log("CCAA no encontrada:", id);
        return null;
      }
      console.log("CCAA encontrada:", ccaa);
      return ccaa;
    } catch (error) {
      console.error("Error al obtener CCAA por ID:", error);
      throw error;
    }
  },

  // Función para actualizar una CCAA
  updateCCAA: async (id, nombre) => {
    try {
      const ccaa = await CCAA.findByPk(id);
      if (!ccaa) {
        console.log("CCAA no encontrada:", id);
        return null;
      }
      ccaa.Nombre = nombre;
      await ccaa.save();
      console.log("CCAA actualizada:", ccaa);
      return ccaa;
    } catch (error) {
      console.error("Error al actualizar CCAA:", error);
      throw error;
    }
  },

  // Función para eliminar una CCAA
  deleteCCAA: async (id) => {
    try {
      const ccaa = await CCAA.findByPk(id);
      if (!ccaa) {
        console.log("CCAA no encontrada:", id);
        return null;
      }
      await ccaa.destroy();
      console.log("CCAA eliminada:", id);
      return ccaa;
    } catch (error) {
      console.error("Error al eliminar CCAA:", error);
      throw error;
    }
  },
};

export default ccaaService;
