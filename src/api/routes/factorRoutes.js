/**
 * Rutas de la API para factores.
 * Este módulo define las rutas para operaciones CRUD en factores,
 * incluyendo obtener todos los factores, obtener un factor por ID,
 * crear, actualizar y eliminar factores.
 * @module routes/factorRoutes
 */

import express from 'express';
import factorController from '../controllers/factorController.js';

const router = express.Router();

/**
 * Ruta para obtener todos los factores.
 * @name get/
 * @function
 * @memberof module:routes/factorRoutes
 * @inner
 */
router.get('/', factorController.getFactors);

/**
 * Ruta para obtener un factor por su ID.
 * @name get/:id
 * @function
 * @memberof module:routes/factorRoutes
 * @inner
 */
router.get('/:id', factorController.getFactorById);

/**
 * Ruta para crear un nuevo factor.
 * @name post/create
 * @function
 * @memberof module:routes/factorRoutes
 * @inner
 */
router.post('/create', factorController.createFactor);

/**
 * Ruta para actualizar un factor por ID.
 * @name put/update/:id
 * @function
 * @memberof module:routes/factorRoutes
 * @inner
 */
router.put('/update/:id', factorController.updateFactorById);

/**
 * Ruta para eliminar un factor por su ID.
 * @name delete/:id
 * @function
 * @memberof module:routes/factorRoutes
 * @inner
 */
router.delete('/:id', factorController.deleteFactorById);

/**
 * Ruta para obtener todos los factores de un tipo específico.
 * @name get/type/:tipo
 * @function
 * @memberof module:routes/factorRoutes
 * @inner
 */
router.get('/type/:tipo', factorController.getFactorsByType);

export default router;
