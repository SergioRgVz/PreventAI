import express from 'express';
import ccaaController from '../controllers/ccaaController.js';

const router = express.Router();

// Ruta para crear una nueva CCAA
router.post('/', ccaaController.createCCAA);

// Ruta para obtener todas las CCAA
router.get('/', ccaaController.getAllCCAA);

// Ruta para obtener una CCAA por su ID
router.get('/:id', ccaaController.getCCAAById);

// Ruta para actualizar una CCAA
router.put('/:id', ccaaController.updateCCAA);

// Ruta para eliminar una CCAA
router.delete('/:id', ccaaController.deleteCCAA);

export default router;
