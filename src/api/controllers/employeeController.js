/**
 * Controlador para gestionar las operaciones relacionadas con empleados.
 * Incluye funciones para obtener, crear, actualizar y eliminar empleados.
 * @module controllers/employeeController
 */

import employeeService from '../services/employeeService.js';
import companyService from '../services/companyService.js';

/**
 * Obtiene y devuelve todos los empleados registrados.
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 */
export const getEmployees = async (req, res) => {
    try {
        const userId = req.user.userId;
        const employees = await employeeService.findEmployeesByUserId(userId);
        return res.status(200).json({ employees });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

/**
 * Obtiene un empleado por su ID y lo devuelve.
 * @param {Object} req - Objeto de solicitud Express, contiene el ID del empleado en `req.params`.
 * @param {Object} res - Objeto de respuesta Express.
 */
export const getEmployeeByDNI = async (req, res) => {
    try {
        const { DNI } = req.params;
        const employee = await employeeService.findEmployeeById(DNI);
        if (!employee) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        return res.status(200).json({ employee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

/**
 * Crea un nuevo empleado en la base de datos.
 * @param {Object} req - Objeto de solicitud Express, contiene los datos del empleado en `req.body`.
 * @param {Object} res - Objeto de respuesta Express.
 */
export const createEmployee = async (req, res) => {
    try {
        const { DNI, name, surname, telephone, age, company, birth_date } = req.body;
        const companyExists = await companyService.findCompany(company);
        if (!companyExists) {
            return res.status(404).json({ message: 'Empresa no encontrada' });
        }
        const employee = await employeeService.createEmployee(DNI, name, surname, telephone, age, companyExists, birth_date);
        if (!employee) {
            return res.status(409).json({ message: 'El empleado ya existe' });
        }
        return res.status(201).json({ message: 'Empleado creado', employee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

/**
 * Actualiza un empleado por su ID con los datos proporcionados.
 * @param {Object} req - Objeto de solicitud Express, contiene el ID del empleado y los datos a actualizar en `req.params` y `req.body`.
 * @param {Object} res - Objeto de respuesta Express.
 */
export const updateEmployeeByDNI = async (req, res) => {
    try {
        const { DNI } = req.params;
        const { name, surname, telephone, age, company, birth_date } = req.body;
        const dateObject = new Date(birth_date);
                
        const companyExists = await companyService.findCompany(company);
        if (!companyExists) {
            return res.status(404).json({ message: 'Empresa no encontrada' });
        }
        const employee = await employeeService.updateEmployee( DNI, name, surname, telephone, age, companyExists, dateObject);
        if (!employee) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        return res.status(200).json({ message: 'Empleado actualizado', employee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

/**
 * Elimina un empleado por su DNI.
 * @param {Object} req - Objeto de solicitud Express, contiene el DNI del empleado en `req.body`.
 * @param {Object} res - Objeto de respuesta Express.
 */
export const deleteEmployeeByDNI = async (req, res) => {
    try {
        const { DNI } = req.params;
        const employee = await employeeService.deleteEmployee(DNI);
        if (!employee) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        return res.status(200).json({ message: 'Empleado eliminado', employee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

/**
 * Elimina un empleado por su ID.
 * @param {Object} req - Objeto de solicitud Express, contiene el ID del empleado en `req.params`.
 * @param {Object} res - Objeto de respuesta Express.
 */
export const deleteEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await employeeService.deleteEmployeeById(id);
        if (!employee) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        return res.status(200).json({ message: 'Empleado eliminado', employee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}