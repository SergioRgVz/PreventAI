/**
 * Servicio para gestionar las operaciones de factores en la base de datos.
 * Proporciona funciones para buscar, crear y eliminar factores basados en diferentes criterios.
 * @module services/factorService
 */

import Factor from '../models/Factor.js';

const factorService = {
    /**
     * Encuentra un factor por su ID.
     * @param {number} id - El ID del factor a buscar.
     * @returns {Promise<Factor|null>} El factor encontrado o null si no existe.
     */
    findFactorById: async (id) => {
        try {
            const factor = await Factor.findByPk(id);
            return factor;
        } catch (error) {
            console.error('Error al buscar factor por ID:', error);
            return null;
        }
    },

    /**
     * Encuentra todos los factores registrados.
     * @returns {Promise<Array<Factor>>} Una lista de todos los factores.
     */
    findAllFactors: async () => {
        try {
            const factors = await Factor.findAll();
            return factors;
        } catch (error) {
            console.error('Error al buscar todos los factores:', error);
            return null;
        }
    },

    /**
     * Crea un nuevo factor en la base de datos.
     * @param {string} nombre - Nombre del factor.
     * @param {string} tipo - Tipo del factor (GINSHT o PVD).
     * @returns {Promise<Factor|null>} El factor creado o null si el factor ya existe.
     */
    createFactor: async (nombre, tipo) => {
        try {
            const factor = await Factor.create({ Nombre: nombre, Tipo: tipo });
            console.log('Factor creado:', factor);
            return factor;
        } catch (error) {
            console.error('Error al crear factor:', error);
            throw error;
        }
    },

    /**
     * Actualiza un factor en la base de datos.
     * @param {number} id - El ID del factor a actualizar.
     * @param {string} nombre - El nuevo nombre del factor.
     * @param {string} tipo - El nuevo tipo del factor.
     * @returns {Promise<Factor|null>} El factor actualizado o null si no se encuentra.
     */
    updateFactor: async (id, nombre, tipo) => {
        try {
            const factor = await Factor.findByPk(id);
            if (!factor) {
                console.log('Factor no encontrado:', id);
                return null;
            }
            factor.Nombre = nombre;
            factor.Tipo = tipo;
            await factor.save();
            console.log('Factor actualizado:', factor);
            return factor;
        } catch (error) {
            console.error('Error al actualizar factor:', error);
            throw error;
        }
    },

    /**
     * Elimina un factor por su ID.
     * @param {number} id - El ID del factor a eliminar.
     * @returns {Promise<Factor|null>} El factor eliminado o null si no se encuentra.
     */
    deleteFactor: async (id) => {
        try {
            const factor = await Factor.findByPk(id);
            if (!factor) {
                console.log('Factor no encontrado:', id);
                return null;
            }
            await factor.destroy();
            console.log('Factor eliminado:', factor);
            return factor;
        } catch (error) {
            console.error('Error al eliminar factor:', error);
            throw error;
        }
    },
    /**
   * Encuentra todos los factores por tipo.
   * @param {string} tipo - El tipo de factores a buscar.
   * @returns {Promise<Array<Factor>>} Una lista de factores del tipo especificado.
   */
    findFactorsByType: async (tipo) => {
        try {
            const factors = await Factor.findAll({ where: { Tipo: tipo } });
            return factors;
        } catch (error) {
            console.error('Error al buscar factores por tipo:', error);
            return null;
        }
    },
};

export default factorService;
