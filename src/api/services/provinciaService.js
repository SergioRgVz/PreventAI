import Provincia from "../models/Provincia.js";

const provinciaService = {
    // Función para crear una nueva Provincia
    createProvincia: async (nombre, idCcaa) => {
        try {
            const newProvincia = await Provincia.create({ Nombre: nombre, ID_CCAA: idCcaa });
            console.log("Provincia creada:", newProvincia);
            return newProvincia;
        } catch (error) {
            console.error("Error al crear Provincia:", error);
            throw error;
        }
    },

    // Función para obtener todas las Provincias
    getAllProvincias: async () => {
        try {
            const provincias = await Provincia.findAll();
            console.log("Todas las Provincias:", provincias);
            return provincias;
        } catch (error) {
            console.error("Error al obtener todas las Provincias:", error);
            throw error;
        }
    },

    // Función para obtener una Provincia por su ID
    getProvinciaById: async (id) => {
        try {
            const provincia = await Provincia.findByPk(id);
            if (!provincia) {
                console.log("Provincia no encontrada:", id);
                return null;
            }
            console.log("Provincia encontrada:", provincia);
            return provincia;
        } catch (error) {
            console.error("Error al obtener Provincia por ID:", error);
            throw error;
        }
    },

    // Función para actualizar una Provincia
    updateProvincia: async (id, nombre, idCcaa) => {
        try {
            const provincia = await Provincia.findByPk(id);
            if (!provincia) {
                console.log("Provincia no encontrada:", id);
                return null;
            }
            provincia.Nombre = nombre;
            provincia.ID_CCAA = idCcaa;
            await provincia.save();
            console.log("Provincia actualizada:", provincia);
            return provincia;
        } catch (error) {
            console.error("Error al actualizar Provincia:", error);
            throw error;
        }
    },

    // Función para eliminar una Provincia
    deleteProvincia: async (id) => {
        try {
            const provincia = await Provincia.findByPk(id);
            if (!provincia) {
                console.log("Provincia no encontrada:", id);
                return null;
            }
            await provincia.destroy();
            console.log("Provincia eliminada:", id);
            return provincia;
        } catch (error) {
            console.error("Error al eliminar Provincia:", error);
            throw error;
        }
    },

    // // Función para obtener todas las Provincias de una CCAA específica
    // getProvinciasByCCAAId: async (ccaaId) => {
    //     try {
    //         const provincias = await Provincia.findAll({
    //             where: { ID_CCAA: ccaaId }
    //         });
    //         console.log(`Provincias de la CCAA ${ccaaId}:`, provincias);
    //         return provincias;
    //     } catch (error) {
    //         console.error(`Error al obtener Provincias de la CCAA ${ccaaId}:`, error);
    //         throw error;
    //     }
    // },
};

export default provinciaService;
