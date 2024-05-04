/**
 * Servicio que proporciona funciones para gestionar empresas en la base de datos.
 * Incluye operaciones como encontrar, crear, actualizar y eliminar empresas.
 * @module services/companyService
 */

import Company from '../models/companyModel.js';
import Employee from '../models/employeeModel.js';
import userService from './userService.js';
import { getComunidadAutonomaByCode, getProvinciaByCode, getPoblacionByCode } from './locationService.js';

const companyService = {
    /**
     * Encuentra una empresa por CIF.
     * @param {string} CIF - CIF de la empresa a encontrar.
     * @returns {Promise<Company|null>} La empresa encontrada o null si no se encuentra.
     */
    findCompany: async (CIF) => {
        try {
            const company = await Company.findOne({ CIF }).exec();
            return company;
        } catch (error) {
            return null;
        }
    },
        /**
     * Encuentra una empresa por su ID.
     * @param {string} id - El ID de la empresa a encontrar.
     * @returns {Promise<Company|null>} La empresa encontrada o null si no existe.
     */
    findCompanyById: async (id) => {
        try {
            const company = await Company.findById(id).exec();
            return company;
        } catch (error) {
            return null;
        }
    },
    findCompanyByCIF: async (CIF) => {
        try {
            const company = await Company.findOne({ CIF }).exec();
            return company;
        } catch (error) {
            return null;
        }
    },
    /**
     * Encuentra todas las empresas.
     * @returns {Promise<Array>} Lista de todas las empresas.
     */
    findAllCompanies: async (userId) => {
        try {
            const companies = await Company.find({ User: userId }).exec();
            // Transforma cada compañía para incluir las localizaciones por nombre
            const companiesWithLocations = await Promise.all(companies.map(async (company) => ({
                ...company._doc,
                User: await userService.getUserById(company.User),
                ccaa: await getComunidadAutonomaByCode(company.ccaa),
                provincia: await getProvinciaByCode(company.provincia),
                municipio: await getPoblacionByCode(company.municipio)
            })));

            // console.log('FindallCompanies:', companiesWithLocations);
    
            return companiesWithLocations;
        } catch (error) {
            console.error(error); 
            return null;
        }
    },
    
    /**
     * Crea una nueva empresa.
     * @param {string} CIF - CIF de la nueva empresa.
     * @param {string} name - Nombre de la nueva empresa.
     * @param {Schema.Types.ObjectId} User - ID del usuario asociado a la empresa.
     * @param {string} ccaa - Comunidad autónoma de la empresa.
     * @param {string} provincia - Provincia de la empresa.
     * @param {string} municipio - Municipio de la empresa.
     * @returns {Promise<Company|null>} La empresa creada o null si ya existe.
     */
    createCompany: async (CIF, name ,User, ccaa, provincia, municipio) => {
        try {
            let company = await companyService.findCompany(CIF);
            if (company) {
                console.log('Company already exists:', company);
                return null;
            }
            company = await Company.create({
                CIF: CIF,
                name: name,
                User: User,
                ccaa: ccaa,
                provincia: provincia,
                municipio: municipio
            });
            console.log('Company created:', company);
            return company;
        } catch (error) {
            console.error('Error creating company:', error);
            throw error;
        }
    },
    /**
     * Obtiene todos los empleados asociados a una empresa por su CIF.
     * @param {string} CIF - CIF de la empresa para buscar sus empleados.
     * @returns {Promise<Array>|null} Los empleados de la empresa o null si la empresa no existe.
     * @async
     * @function
     * @name getAllEmployees
     * @memberof module:services/companyService
     * @returns {Promise<Array>|null} Los empleados de la empresa o null si la empresa no existe.
     */
    getAllEmployees: async (CIF) => {
        try {
            const company = await companyService.findCompany(CIF);
            if (!company) {
                console.log('Company does not exist:', company);
                return null;
            }
            const employees = await Employee.find({ company: company._id }).exec();
            // console.log('Employees found:', employees);
            return employees;
        } catch (error) {
            console.error('Error getting employees:', error);
            throw error;
        }
    },

    /**
     * Elimina una empresa por su CIF.
cif     * @returns {Promise<Company|null>} La empresa eliminada o null si no existe.
     */
    deleteCompany: async (cif) => {
        try {
            const company = await companyService.findCompany(cif);
            if (!company) {
                console.log('Company does not exist:', company);
                return null;
            }
            await Company.deleteOne({ CIF: cif }).exec();
            console.log('Company deleted:', company);
            return company;
        } catch (error) {
            console.error('Error deleting company:', error);
            throw error;
        }
    },
    /**
     * Elimina una empresa por su ID.
     * @param {string} id - ID de la empresa a eliminar.
     * @returns {Promise<Company|null>} La empresa eliminada o null si no existe.
     */
    deleteCompanyById: async (id) => {
        try {
            const company = await Company.findByIdAndDelete(id).exec();
            if (!company) {
                console.log('Company does not exist:', company);
                return null;
            }
            console.log('Company deleted:', company);
            return company;
        } catch (error) {
            console.error('Error deleting company:', error);
            throw error;
        }
    },
    updateCompany: async (CIF, name, User, ccaa, provincia, municipio) => {
        try {
            const company = await companyService.findCompany(CIF);
            if (!company) {
                console.log('Company does not exist:', company);
                return null;
            }
            company.name = name,
            company.User = User;
            company.ccaa = ccaa;
            company.provincia = provincia;
            company.municipio = municipio;
            await company.save();
            console.log('Company updated:', company);
            return company;
        } catch (error) {
            console.error('Error updating company:', error);
            throw error;
        }
    }
}

export default companyService;