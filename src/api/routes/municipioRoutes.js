import express from 'express';
import municipioController from '../controllers/municipioController.js';

const router = express.Router();

// Ruta para crear un nuevo Municipio
router.post('/', municipioController.createMunicipio);

// Ruta para obtener todos los Municipios
router.get('/', municipioController.getAllMunicipios);

// Ruta para obtener un Municipio por su ID
router.get('/:id', municipioController.getMunicipioById);

// Ruta para actualizar un Municipio
router.put('/:id', municipioController.updateMunicipio);

// Ruta para eliminar un Municipio
router.delete('/:id', municipioController.deleteMunicipio);

// Ruta para obtener todos los Municipios de una Provincia específica
router.get('/provincia/:provinciaId', municipioController.getMunicipiosByProvinciaId);

export default router;
