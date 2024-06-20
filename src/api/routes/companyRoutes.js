/**
 * Rutas de la API para la gestión de empresas.
 * Este módulo define las rutas para realizar operaciones CRUD sobre empresas,
 * permitiendo obtener todas las empresas, obtener detalles de una empresa específica por ID,
 * crear nuevas empresas, eliminar empresas por CIF o ID y más.
 * 
 * @module routes/companyRoutes
 */

import express from 'express';
import companyController from '../controllers/companyController.js';

const router = express.Router();

/**
 * Ruta para obtener todas las empresas relacionadas con un usuario
 * Método: GET
 * Ruta: /companies
 */
router.get('/', companyController.getCompanies);

/**
 * Ruta para obtener una empresa por su ID
 * Método: GET
 * Ruta: /companies/:id
 */
router.get('/:id', companyController.getCompanyById);

/**
 * Ruta para obtener una empresa por su CIF
 * Método: GET
 * Ruta: /companies/cif/:CIF
 */
router.get('/cif/:CIF', companyController.getCompanyByCIF);

/**
 * Ruta para crear una nueva empresa
 * Método: POST
 * Ruta: /companies
 */
router.post('/', companyController.createCompany);

/**
 * Ruta para actualizar una empresa por su CIF
 * Método: PUT
 * Ruta: /companies/cif/:CIF
 */
router.put('/cif/:CIF', companyController.updateCompanyByCIF);


router.delete('/deleteCompany', companyController.deleteCompany);

/**
 * Ruta para eliminar una empresa por su CIF (método DELETE)
 * Método: DELETE
 * Ruta: /companies/cif/:CIF
 */
router.delete('/cif/:CIF', companyController.deleteCompanyByCIF);

/**
 * Ruta para eliminar una empresa por su ID
 * Método: DELETE
 * Ruta: /companies/:id
 */
router.delete('/:id', companyController.deleteCompanyById);

export default router;
