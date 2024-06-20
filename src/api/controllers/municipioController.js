import municipioService from '../services/municipioService.js';

const municipioController = {
    // Controlador para crear un nuevo Municipio
    createMunicipio: async (req, res) => {
        const { nombre, idProvincia } = req.body;
        try {
            const newMunicipio = await municipioService.createMunicipio(nombre, idProvincia);
            res.status(201).json(newMunicipio);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear Municipio' });
        }
    },

    // Controlador para obtener todos los Municipios
    getAllMunicipios: async (req, res) => {
        try {
            const municipios = await municipioService.getAllMunicipios();
            res.status(200).json(municipios);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener todos los Municipios' });
        }
    },

    // Controlador para obtener un Municipio por su ID
    getMunicipioById: async (req, res) => {
        const { id } = req.params;
        try {
            const municipio = await municipioService.getMunicipioById(id);
            if (!municipio) {
                res.status(404).json({ error: 'Municipio no encontrado' });
            } else {
                res.status(200).json(municipio);
            }
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener Municipio por ID' });
        }
    },

    // Controlador para actualizar un Municipio
    updateMunicipio: async (req, res) => {
        const { id } = req.params;
        const { nombre, idProvincia } = req.body;
        try {
            const updatedMunicipio = await municipioService.updateMunicipio(id, nombre, idProvincia);
            if (!updatedMunicipio) {
                res.status(404).json({ error: 'Municipio no encontrado' });
            } else {
                res.status(200).json(updatedMunicipio);
            }
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar Municipio' });
        }
    },

    // Controlador para eliminar un Municipio
    deleteMunicipio: async (req, res) => {
        const { id } = req.params;
        try {
            const deletedMunicipio = await municipioService.deleteMunicipio(id);
            if (!deletedMunicipio) {
                res.status(404).json({ error: 'Municipio no encontrado' });
            } else {
                res.status(200).json(deletedMunicipio);
            }
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar Municipio' });
        }
    },

    // Controlador para obtener todos los Municipios de una Provincia específica
    getMunicipiosByProvinciaId: async (req, res) => {
        const { provinciaId } = req.params;
        try {
            const municipios = await municipioService.getMunicipiosByProvinciaId(provinciaId);
            res.status(200).json(municipios);
        } catch (error) {
            res.status(500).json({ error: `Error al obtener Municipios de la Provincia ${provinciaId}` });
        }
    }
};

export default municipioController;
