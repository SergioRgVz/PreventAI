/**
 * Rutas de la API para la gestión de empresas.
 * Este módulo define las rutas para realizar operaciones CRUD sobre empresas,
 * permitiendo obtener todas las empresas, obtener detalles de una empresa específica por ID,
 * crear nuevas empresas, eliminar empresas por CIF o ID y más.
 * 
 * @module routes/companyRoutes
 */

import express from 'express';
import { getCompanyById, getCompanyByCIF, getAllEmployeesByCompany, createCompany, updateCompanyByCif, deleteCompanyByCif, deleteCompanyById, getCompanies } from '../controllers/companyController.js';

const router = express.Router();

/**
 * Ruta para obtener todas las empresas.
 * Maneja solicitudes GET para listar todas las empresas registradas.
 * @name get/
 * @function
 * @memberof module:routes/companyRoutes
 */
router.get('/', getCompanies);
/**
 * Ruta para obtener una empresa por su ID.
 * Maneja solicitudes GET para buscar y retornar los detalles de una empresa específica basada en su ID único.
 * @name get/:id
 * @function
 * @memberof module:routes/companyRoutes
 */
router.get('/:id', getCompanyById);
/**
 * Ruta para obtener todos los empleados de una empresa por su CIF.
 * Maneja solicitudes GET para buscar y retornar todos los empleados asociados a una empresa específica por su CIF único.
 * @name getEmployees/:CIF
 * @function
 * @memberof module:routes/companyRoutes
 */
router.get('/getEmployees/:CIF', getAllEmployeesByCompany);

router.get('/getCompany/:CIF', getCompanyByCIF);
/**
 * Ruta para crear una nueva empresa.
 * Maneja solicitudes POST, recibiendo datos de una empresa en el cuerpo de la solicitud para crearla en la base de datos.
 * @name post/create
 * @function
 * @memberof module:routes/companyRoutes
 */
router.post('/create', createCompany);

router.put('/update/:CIF', updateCompanyByCif);
/**
 * Ruta para eliminar una empresa por su CIF.
 * Maneja solicitudes POST para eliminar una empresa específica usando su CIF único.
 * Nota: Es poco común usar POST para operaciones de eliminación; considera cambiar a DELETE si es posible.
 * @name post/deletebycif
 * @function
 * @memberof module:routes/companyRoutes
 */
// router.post('/deletebycif', deleteCompanyByCif);
/**
 * Ruta para eliminar una empresa por su ID.
 * Maneja solicitudes DELETE para eliminar una empresa específica basada en su ID único.
 * @name delete/:id
 * @function
 * @memberof module:routes/companyRoutes
 */
router.delete('/:id', deleteCompanyById);

router.delete('/delete/:cif', deleteCompanyByCif);
export default router;
