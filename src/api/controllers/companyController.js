/**
 * Controladores para gestionar empresas.
 * Incluye funciones para obtener, crear, actualizar y eliminar empresas.
 * @module controllers/companyController
 */

import companyService from '../services/companyService.js';
import userService from '../services/userService.js';

const companyController = {
    /**
     * Obtiene y devuelve todas las empresas registradas.
     * @param {Object} req - Objeto de solicitud Express.
     * @param {Object} res - Objeto de respuesta Express.
     */
    getCompanies: async (req, res) => {
        try {
            const userId = req.user.userId;
            if (!userId) 
                return res.status(401).json({ code: 401, message: 'Usuario no autorizado' });

            const User = await userService.getUserById(userId);
            if (!User) return res.status(404).json({ message: 'Usuario no encontrado' }
            );

            //Es admin
            if (!User.esTecnico) {
                const companies = await companyService.getAllCompanies();
                if (companies.length === 0) return res.status(404).json({ message: 'No hay empresas registradas' });
                return res.status(200).json({ companies });
            }
            const companies = await companyService.getCompaniesByUserId(userId);
            if (companies.length === 0) return res.status(200).json({ message: 'No hay empresas registradas' });
            return res.status(200).json({ companies });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    /**
     * Obtiene una empresa por su ID y la devuelve en la respuesta.
     * @param {Object} req - Objeto de solicitud Express. Contiene el ID de la empresa en `req.params`.
     * @param {Object} res - Objeto de respuesta Express.
     */
    getCompanyById: async (req, res) => {
        try {
            const userId = req.user.userId;
            if (!userId) 
                return res.status(401).json({ code: 401, message: 'Usuario no autorizado' });

            const { id } = req.params;
            const company = await companyService.getCompanyById(id);
            if (!company) {
                return res.status(404).json({ message: 'Empresa no encontrada' });
            }
            return res.status(200).json({ company });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    /**
     * Obtiene una empresa por su CIF y la devuelve en la respuesta.
     * @param {Object} req - Objeto de solicitud Express. Contiene el CIF de la empresa en `req.params`.
     * @param {Object} res - Objeto de respuesta Express.
     */
    getCompanyByCIF: async (req, res) => {
        try {
            const userId = req.user.userId;
            if (!userId) 
                return res.status(401).json({ code: 401, message: 'Usuario no autorizado' });

            const { CIF } = req.params;
            const company = await companyService.getCompanyByCIF(CIF);
            if (!company) {
                return res.status(404).json({ message: 'Empresa no encontrada' });
            }
            return res.status(200).json({ company });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    /**
     * Crea una nueva empresa asociada a un usuario.
     * @param {Object} req - Objeto de solicitud Express. Contiene los datos de la empresa en `req.body`.
     * @param {Object} res - Objeto de respuesta Express.
     */
    createCompany: async (req, res) => {
        try {
            const userId = req.user.userId;
            const { CIF, Nombre, municipio } = req.body;
            if (!userId) {
                return res.status(401).json({ message: 'Usuario no autorizado' });
            }
            const company = await companyService.createCompany({
                CIF,
                Nombre,
                ID_Usuario: userId,
                municipio
            });
            return res.status(201).json({ message: 'Empresa creada', company });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    /**
     * Actualiza una empresa por su CIF.
     * @param {Object} req - Objeto de solicitud Express. Contiene el CIF de la empresa en `req.params`.
     * @param {Object} res - Objeto de respuesta Express.
     */
    updateCompanyByCIF: async (req, res) => {
        try {
            const { CIF } = req.params;
            const userId = req.user.userId;
            const { nombre, ID_Municipio } = req.body;
            if (!userId) {
                return res.status(401).json({ message: 'Usuario no autorizado' });
            }
            const company = await companyService.updateCompanyByCIF(CIF, {
                nombre,
                ID_Usuario: userId,
                ID_Municipio
            });
            if (!company) {
                return res.status(404).json({ message: 'Empresa no encontrada' });
            }
            return res.status(200).json({ message: 'Empresa actualizada', company });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    /**
     * Actualiza una empresa por su ID.
     * @param {Object} req - Objeto de solicitud Express. Contiene el ID de la empresa en `req.params` y los nuevos datos en `req.body`.
     * @param {Object} res - Objeto de respuesta Express.
     */
    updateCompanyById: async (req, res) => {
        try {
            const { id } = req.params;
            const { CIF, name, technician, ccaa, provincia, municipio } = req.body;
            const user = await userService.findUserByEmail(technician);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            const company = await companyService.updateCompanyById(id, {
                CIF,
                name,
                ID_Usuario: user.ID,
                ccaa,
                provincia,
                municipio
            });
            if (!company) {
                return res.status(404).json({ message: 'Empresa no encontrada' });
            }
            return res.status(200).json({ message: 'Empresa actualizada', company });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    deleteCompany: async (req, res) => {
        try {
            const userId = req.user.userId;
            const { companyId } = req.body;

            if (!userId || !companyId) {
                return res.status(400).json({ message: 'Faltan parámetros userId o companyId' });
            }


            const company = await companyService.getCompanyByCIF(companyId);
            if (!company) {
                return res.status(404).json({ message: 'Empresa no encontrada' });
            }

            const esTecnico = await userService.checkIfTechnician(userId);

            if (esTecnico) {
                const result = await companyService.deleteUserCompanyRelation(userId, company.ID);
                if (result) {
                    res.status(200).json({ message: 'Relación eliminada con éxito' });
                } else {
                    res.status(404).json({ message: 'Relación no encontrada' });
                }
            }
            else {
                await companyService.deleteCompanyRelations(company.ID);

                const result_Company = await companyService.deleteCompanyByCIF(companyId);
                if (result_Company) {
                    res.status(200).json({ message: 'Empresa eliminada con éxito' });

                }
            }
        } catch (error) {
            console.error('Error al eliminar la empresa:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    /**
     * Elimina una empresa por su CIF.
     * @param {Object} req - Objeto de solicitud Express. Contiene el CIF de la empresa en `req.params`.
     * @param {Object} res - Objeto de respuesta Express.
     */
    deleteCompanyByCIF: async (req, res) => {
        try {
            const { CIF } = req.params;
            const company = await companyService.deleteCompanyByCIF(CIF);
            if (!company) {
                return res.status(404).json({ message: 'Empresa no encontrada' });
            }
            return res.status(200).json({ message: 'Empresa eliminada', company });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    /**
     * Elimina una empresa por su ID.
     * @param {Object} req - Objeto de solicitud Express. Contiene el ID de la empresa en `req.params`.
     * @param {Object} res - Objeto de respuesta Express.
     */
    deleteCompanyById: async (req, res) => {
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
};

export default companyController;
