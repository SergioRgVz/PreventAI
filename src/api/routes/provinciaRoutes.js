import express from 'express';
import provinciaController from '../controllers/provinciaController.js';

const router = express.Router();

// Ruta para crear una nueva Provincia
router.post('/', provinciaController.createProvincia);

// Ruta para obtener todas las Provincias
router.get('/', provinciaController.getAllProvincias);

// Ruta para obtener una Provincia por su ID
router.get('/:id', provinciaController.getProvinciaById);

// Ruta para actualizar una Provincia
router.put('/:id', provinciaController.updateProvincia);

// Ruta para eliminar una Provincia
router.delete('/:id', provinciaController.deleteProvincia);

// // Ruta para obtener todas las Provincias de una CCAA específica
// router.get('/ccaa/:ccaaId', provinciaController.getProvinciasByCCAAId);

export default router;
