import {Municipio} from "../models/associations.js";

const municipioService = {
    // Función para crear un nuevo Municipio
    createMunicipio: async (nombre, idProvincia) => {
        try {
            const newMunicipio = await Municipio.create({ Nombre: nombre, ID_Provincia: idProvincia });
            console.log("Municipio creado:", newMunicipio);
            return newMunicipio;
        } catch (error) {
            console.error("Error al crear Municipio:", error);
            throw error;
        }
    },

    // Función para obtener todos los Municipios
    getAllMunicipios: async () => {
        try {
            const municipios = await Municipio.findAll();
            console.log("Todos los Municipios:", municipios);
            return municipios;
        } catch (error) {
            console.error("Error al obtener todos los Municipios:", error);
            throw error;
        }
    },

    // Función para obtener un Municipio por su ID
    getMunicipioById: async (id) => {
        try {
            const municipio = await Municipio.findByPk(id);
            if (!municipio) {
                console.log("Municipio no encontrado:", id);
                return null;
            }
            console.log("Municipio encontrado:", municipio);
            return municipio;
        } catch (error) {
            console.error("Error al obtener Municipio por ID:", error);
            throw error;
        }
    },

    // Función para actualizar un Municipio
    updateMunicipio: async (id, nombre, idProvincia) => {
        try {
            const municipio = await Municipio.findByPk(id);
            if (!municipio) {
                console.log("Municipio no encontrado:", id);
                return null;
            }
            municipio.Nombre = nombre;
            municipio.ID_Provincia = idProvincia;
            await municipio.save();
            console.log("Municipio actualizado:", municipio);
            return municipio;
        } catch (error) {
            console.error("Error al actualizar Municipio:", error);
            throw error;
        }
    },

    // Función para eliminar un Municipio
    deleteMunicipio: async (id) => {
        try {
            const municipio = await Municipio.findByPk(id);
            if (!municipio) {
                console.log("Municipio no encontrado:", id);
                return null;
            }
            await municipio.destroy();
            console.log("Municipio eliminado:", id);
            return municipio;
        } catch (error) {
            console.error("Error al eliminar Municipio:", error);
            throw error;
        }
    },

    // Función para obtener todos los Municipios de una Provincia específica
    getMunicipiosByProvinciaId: async (provinciaId) => {
        try {
            const municipios = await Municipio.findAll({
                where: { ID_Provincia: provinciaId }
            });
            console.log(`Municipios de la Provincia ${provinciaId}:`, municipios);
            return municipios;
        } catch (error) {
            console.error(`Error al obtener Municipios de la Provincia ${provinciaId}:`, error);
            throw error;
        }
    },
};

export default municipioService;
