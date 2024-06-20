import ccaaService from '../services/ccaaService.js';

const ccaaController = {
    // Controlador para crear una nueva CCAA
    createCCAA: async (req, res) => {
        const { nombre } = req.body;
        try {
            const newCCAA = await ccaaService.createCCAA(nombre);
            res.status(201).json(newCCAA);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear CCAA' });
        }
    },

    // Controlador para obtener todas las CCAA
    getAllCCAA: async (req, res) => {
        try {
            const ccaas = await ccaaService.getAllCCAA();
            res.status(200).json(ccaas);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener todas las CCAA' });
        }
    },

    // Controlador para obtener una CCAA por su ID
    getCCAAById: async (req, res) => {
        const { id } = req.params;
        try {
            const ccaa = await ccaaService.getCCAAById(id);
            if (!ccaa) {
                res.status(404).json({ error: 'CCAA no encontrada' });
            } else {
                res.status(200).json(ccaa);
            }
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener CCAA por ID' });
        }
    },

    // Controlador para actualizar una CCAA
    updateCCAA: async (req, res) => {
        const { id } = req.params;
        const { nombre } = req.body;
        try {
            const updatedCCAA = await ccaaService.updateCCAA(id, nombre);
            if (!updatedCCAA) {
                res.status(404).json({ error: 'CCAA no encontrada' });
            } else {
                res.status(200).json(updatedCCAA);
            }
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar CCAA' });
        }
    },

    // Controlador para eliminar una CCAA
    deleteCCAA: async (req, res) => {
        const { id } = req.params;
        try {
            const deletedCCAA = await ccaaService.deleteCCAA(id);
            if (!deletedCCAA) {
                res.status(404).json({ error: 'CCAA no encontrada' });
            } else {
                res.status(200).json(deletedCCAA);
            }
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar CCAA' });
        }
    }
};

export default ccaaController;
