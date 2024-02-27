/**
 * Controladores para gestionar empresas.
 * Incluye funciones para obtener, crear, actualizar y eliminar empresas.
 * @module controllers/companyController
 */

import companyService from '../services/companyService.js';
import userService from '../services/userService.js';

/**
 * Obtiene y devuelve todas las empresas registradas.
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 */
export const getCompanies = async (req, res) => {
    try {
        const companies = await companyService.findAllCompanies();
        return res.status(200).json({ companies });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

/**
 * Obtiene una empresa por su ID y la devuelve en la respuesta.
 * 
 * Esta función maneja la solicitud GET para obtener los detalles de una empresa específica
 * utilizando su ID único. Si la empresa se encuentra, devuelve los detalles de la empresa
 * en la respuesta con un estado HTTP 200. Si no se encuentra la empresa, devuelve un error
 * 404 indicando que la empresa no fue encontrada. En caso de errores en la operación de
 * búsqueda, se devuelve un error 500 indicando un error interno del servidor.
 *
 * @param {Object} req - Objeto de solicitud Express. Contiene el ID de la empresa en `req.params`.
 * @param {Object} res - Objeto de respuesta Express. Utilizado para enviar la respuesta HTTP.
 */
export const getCompanyById = async (req, res) => {
    try {
        const { id } = req.params;
        const company = await companyService.findCompanyById(id);
        if (!company) {
            return res.status(404).json({ message: 'Empresa no encontrada' });
        }
        return res.status(200).json({ company });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

/**
 * Crea una nueva empresa asociada a un usuario.
 * @param {Object} req - Objeto de solicitud Express. Contiene los datos de la empresa en `req.body`.
 * @param {Object} res - Objeto de respuesta Express.
 */
export const createCompany = async (req, res) => {
    try {
        const { CIF, name, technician, ccaa, provincia, municipio } = req.body;
        console.log(technician);
        const user = await userService.findUser(technician);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const company = await companyService.createCompany(CIF, name, user, ccaa, provincia, municipio);
        if (!company) {
            return res.status(409).json({ message: 'La empresa ya existe' });
        }
        return res.status(201).json({ message: 'Empresa creada', company });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const updateCompanyByCif = async (req, res) => {
    try {
        const { CIF } = req.params;
        const { name, technician, ccaa, provincia, municipio } = req.body;
        const user = await userService.findUser(technician);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const company = await companyService.updateCompany(CIF, name, user, ccaa, provincia, municipio);
        if (!company) {
            return res.status(404).json({ message: 'Empresa no encontrada' });
        }
        return res.status(200).json({ message: 'Empresa actualizada', company });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

/**
 * Actualiza una empresa por su ID.
 * @param {Object} req - Objeto de solicitud Express. Contiene el ID de la empresa y los nuevos datos en `req.body`.
 * @param {Object} res - Objeto de respuesta Express.
 */
export const updateCompanyById = async (req, res) => {
    try {
        const { id } = req.params;
        const { CIF, name, technician, ccaa, provincia, municipio } = req.body;
        const user = await userService.findUser(email);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const company = await companyService.updateCompany(id, CIF, name, technician, user, ccaa, provincia, municipio);
        if (!company) {
            return res.status(404).json({ message: 'Empresa no encontrada' });
        }
        return res.status(200).json({ message: 'Empresa actualizada', company });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const getAllEmployeesByCompany = async (req, res) => {
    try {
        const { CIF } = req.params;
        const employees = await companyService.getAllEmployees(CIF);
        if (!employees) {
            return res.status(404).json({ message: 'No se encontraron empleados' });
        }
        return res.status(200).json({ employees });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

/**
 * Elimina una empresa por su CIF.
 * @param {Object} req - Objeto de solicitud Express. Contiene el CIF de la empresa en `req.body`.
 * @param {Object} res - Objeto de respuesta Express.
 */
export const deleteCompanyByCif = async (req, res) => {
    try {
        const { CIF } = req.body;
        const company = await companyService.deleteCompany(CIF);
        if (!company) {
            return res.status(404).json({ message: 'Empresa no encontrada' });
        }
        return res.status(200).json({ message: 'Empresa eliminada', company });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

/**
 * Elimina una empresa por su ID.
 * @param {Object} req - Objeto de solicitud Express. Contiene el ID de la empresa en `req.params`.
 * @param {Object} res - Objeto de respuesta Express.
 */
export const deleteCompanyById = async (req, res) => {
    try {
        const { id } = req.params;
        const company = await companyService.deleteCompanyById(id);
        if (!company) {
            return res.status(404).json({ message: 'Empresa no encontrada' });
        }
        return res.status(200).json({ message: 'Empresa eliminada', company });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}