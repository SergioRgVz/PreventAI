import provinciaService from '../services/provinciaService.js';

const provinciaController = {
    // Controlador para crear una nueva Provincia
    createProvincia: async (req, res) => {
        const { nombre, idCcaa } = req.body;
        try {
            const newProvincia = await provinciaService.createProvincia(nombre, idCcaa);
            res.status(201).json(newProvincia);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear Provincia' });
        }
    },

    // Controlador para obtener todas las Provincias
    getAllProvincias: async (req, res) => {
        try {
            const provincias = await provinciaService.getAllProvincias();
            res.status(200).json(provincias);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener todas las Provincias' });
        }
    },

    // Controlador para obtener una Provincia por su ID
    getProvinciaById: async (req, res) => {
        const { id } = req.params;
        try {
            const provincia = await provinciaService.getProvinciaById(id);
            if (!provincia) {
                res.status(404).json({ error: 'Provincia no encontrada' });
            } else {
                res.status(200).json(provincia);
            }
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener Provincia por ID' });
        }
    },

    // Controlador para actualizar una Provincia
    updateProvincia: async (req, res) => {
        const { id } = req.params;
        const { nombre, idCcaa } = req.body;
        try {
            const updatedProvincia = await provinciaService.updateProvincia(id, nombre, idCcaa);
            if (!updatedProvincia) {
                res.status(404).json({ error: 'Provincia no encontrada' });
            } else {
                res.status(200).json(updatedProvincia);
            }
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar Provincia' });
        }
    },

    // Controlador para eliminar una Provincia
    deleteProvincia: async (req, res) => {
        const { id } = req.params;
        try {
            const deletedProvincia = await provinciaService.deleteProvincia(id);
            if (!deletedProvincia) {
                res.status(404).json({ error: 'Provincia no encontrada' });
            } else {
                res.status(200).json(deletedProvincia);
            }
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar Provincia' });
        }
    },

    // // Controlador para obtener todas las Provincias de una CCAA específica
    // getProvinciasByCCAAId: async (req, res) => {
    //     const { ccaaId } = req.params;
    //     try {
    //         const provincias = await provinciaService.getProvinciasByCCAAId(ccaaId);
    //         res.status(200).json(provincias);
    //     } catch (error) {
    //         res.status(500).json({ error: `Error al obtener Provincias de la CCAA ${ccaaId}` });
    //     }
    // }
};

export default provinciaController;
