/**
 * Rutas de la API para empleados.
 * Este módulo define las rutas para operaciones CRUD en empleados,
 * incluyendo obtener todos los empleados, obtener un empleado por ID,
 * crear, actualizar y eliminar empleados.
 * @module routes/employeeRoutes
 */

import express from 'express';
import employeeController from '../controllers/employeeController.js';

const router = express.Router();

/**
 * Ruta para obtener todos los empleados.
 * @name get/
 * @function
 * @memberof module:routes/employeeRoutes
 * @inner
 */
router.get('/', employeeController.getEmployees);

/**
 * Ruta para obtener un empleado por su DNI.
 * @name get/dni/:DNI
 * @function
 * @memberof module:routes/employeeRoutes
 * @inner
 */
router.get('/dni/:DNI', employeeController.getEmployeeByDNI);

/**
 * Ruta para crear un nuevo empleado.
 * @name post/create
 * @function
 * @memberof module:routes/employeeRoutes
 * @inner
 */
router.post('/create', employeeController.createEmployee);

/**
 * Ruta para actualizar un empleado por ID.
 * @name put/update/:employeeId
 * @function
 * @memberof module:routes/employeeRoutes
 * @inner
 */
router.put('/update/:employeeDNI', employeeController.updateEmployee);



/**
 * Ruta para eliminar un empleado por su ID.
 * @name delete/:employeeId
 * @function
 * @memberof module:routes/employeeRoutes
 * @inner
 */
router.delete('/delete/:employeeDNI', employeeController.deleteEmployee);

/**
 * Ruta para obtener todos los empleados de una empresa por el ID de la empresa.
 * @name get/company/:companyId/employees
 * @function
 * @memberof module:routes/employeeRoutes
 * @inner
 */
router.get('/company/:companyId/employees', employeeController.getEmployeesByCompanyId);

export default router;
