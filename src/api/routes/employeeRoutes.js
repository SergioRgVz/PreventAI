/**
 * Rutas de la API para empleados.
 * Este módulo define las rutas para operaciones CRUD en empleados,
 * incluyendo obtener todos los empleados, obtener un empleado por ID,
 * crear, actualizar y eliminar empleados.
 * @module routes/employeeRoutes
 */

import express from 'express';
import { getEmployeeByDNI, createEmployee, deleteEmployeeByDNI, getEmployees, updateEmployeeByDNI } from '../controllers/employeeController.js';

const router = express.Router();

/**
 * Ruta para obtener todos los empleados.
 * @name get/
 * @function
 * @memberof module:routes/employeeRoutes
 * @inner
 */
router.get('/', getEmployees);

/**
 * Ruta para obtener un empleado por su ID.
 * @name get/:id
 * @function
 * @memberof module:routes/employeeRoutes
 * @inner
 */
router.get('/:DNI', getEmployeeByDNI);

/**
 * Ruta para crear un nuevo empleado.
 * @name post/create
 * @function
 * @memberof module:routes/employeeRoutes
 * @inner
 */
router.post('/create', createEmployee);

/**
 * Ruta para actualizar un empleado por ID. Aunque es común usar el ID como parte del URL (e.g., PUT /:id),
 * este enfoque utiliza un cuerpo de solicitud para pasar el ID y los datos actualizados.
 * @name put/update
 * @function
 * @memberof module:routes/employeeRoutes
 * @inner
 */
router.put('/update/:DNI', updateEmployeeByDNI);

/**
 * Ruta para eliminar un empleado por su ID.
 * @name delete/:id
 * @function
 * @memberof module:routes/employeeRoutes
 * @inner
 */
router.delete('/:DNI', deleteEmployeeByDNI);

export default router;
