/**
 * Servicio para gestionar las operaciones de imágenes en la base de datos.
 * Proporciona funciones para buscar, crear y eliminar imágenes basadas en diferentes criterios.
 * @module services/imagenService
 */

import {Imagen} from '../models/associations.js';

const imagenService = {
    /**
     * Encuentra todas las imágenes asociadas a un informe por el ID del informe.
     * @param {number} idInforme - El ID del informe.
     * @returns {Promise<Array<Imagen>>} Una lista de imágenes.
     */
    findImagesByInformeId: async (idInforme) => {
        try {
            const images = await Imagen.findAll({ where: { ID_Informe: idInforme } });
            return images;
        } catch (error) {
            console.error('Error al buscar imágenes por ID de informe:', error);
            return null;
        }
    },

    /**
     * Crea una nueva imagen en la base de datos.
     * @param {string} url - URL de la imagen.
     * @param {number} idInforme - ID del informe asociado.
     * @returns {Promise<Imagen>} La imagen creada.
     */
    createImage: async (url, idInforme) => {
        try {
            const image = await Imagen.create({ URL: url, ID_Informe: idInforme });
            console.log('Imagen creada:', image);
            return image;
        } catch (error) {
            console.error('Error al crear imagen:', error);
            throw error;
        }
    },

    /**
     * Elimina una imagen por su ID.
     * @param {number} id - El ID de la imagen a eliminar.
     * @returns {Promise<Imagen|null>} La imagen eliminada o null si no se encuentra.
     */
    deleteImage: async (id) => {
        try {
            const image = await Imagen.findByPk(id);
            if (!image) {
                console.log('Imagen no encontrada:', id);
                return null;
            }
            await image.destroy();
            console.log('Imagen eliminada:', image);
            return image;
        } catch (error) {
            console.error('Error al eliminar imagen:', error);
            throw error;
        }
    }
};

export default imagenService;
