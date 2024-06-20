/**
 * Controlador para gestionar las operaciones relacionadas con factores.
 * Incluye funciones para obtener, crear, actualizar y eliminar factores.
 * @module controllers/factorController
 */

import factorService from '../services/factorService.js';

const factorController = {
    /**
     * Obtiene y devuelve todos los factores registrados.
     * @param {Object} req - Objeto de solicitud Express.
     * @param {Object} res - Objeto de respuesta Express.
     */
    getFactors: async (req, res) => {
        try {
            const factors = await factorService.findAllFactors();
            return res.status(200).json({ factors });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    /**
     * Obtiene un factor por su ID y lo devuelve.
     * @param {Object} req - Objeto de solicitud Express, contiene el ID del factor en `req.params`.
     * @param {Object} res - Objeto de respuesta Express.
     */
    getFactorById: async (req, res) => {
        try {
            const { id } = req.params;
            const factor = await factorService.findFactorById(id);
            if (!factor) {
                return res.status(404).json({ message: 'Factor no encontrado' });
            }
            return res.status(200).json({ factor });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    /**
     * Crea un nuevo factor en la base de datos.
     * @param {Object} req - Objeto de solicitud Express, contiene los datos del factor en `req.body`.
     * @param {Object} res - Objeto de respuesta Express.
     */
    createFactor: async (req, res) => {
        try {
            const { nombre, tipo } = req.body;
            const factor = await factorService.createFactor(nombre, tipo);
            return res.status(201).json({ message: 'Factor creado', factor });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    /**
     * Actualiza un factor por su ID con los datos proporcionados.
     * @param {Object} req - Objeto de solicitud Express, contiene el ID del factor y los datos a actualizar en `req.params` y `req.body`.
     * @param {Object} res - Objeto de respuesta Express.
     */
    updateFactorById: async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre, tipo } = req.body;
            const factor = await factorService.updateFactor(id, nombre, tipo);
            if (!factor) {
                return res.status(404).json({ message: 'Factor no encontrado' });
            }
            return res.status(200).json({ message: 'Factor actualizado', factor });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    /**
     * Elimina un factor por su ID.
     * @param {Object} req - Objeto de solicitud Express, contiene el ID del factor en `req.params`.
     * @param {Object} res - Objeto de respuesta Express.
     */
    deleteFactorById: async (req, res) => {
        try {
            const { id } = req.params;
            const factor = await factorService.deleteFactor(id);
            if (!factor) {
                return res.status(404).json({ message: 'Factor no encontrado' });
            }
            return res.status(200).json({ message: 'Factor eliminado', factor });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    getFactorsByType: async (req, res) => {
        try {
            const { tipo } = req.params;
            const factors = await factorService.findFactorsByType(tipo);
            if (!factors) {
                return res.status(404).json({ message: 'Factores no encontrados' });
            }
            return res.status(200).json({ factors });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
};

export default factorController;
