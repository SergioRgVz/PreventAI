import {Empresa} from '../models/associations.js';
import {Municipio} from '../models/associations.js';
import {User} from '../models/associations.js';
import {UsuarioEmpresa} from '../models/associations.js';

const companyService = {
    createCompany: async (data) => {
        try {
            const existingCompany = await Empresa.findOne({ where: { CIF: data.CIF } });
            if (existingCompany) {
                const userCompanyRelation = await UsuarioEmpresa.create({
                    ID_Empresa: existingCompany.ID,
                    ID_Usuario: data.ID_Usuario
                });
                console.log('Relación Usuario-Empresa creada:', userCompanyRelation);
                return existingCompany;
            }

            // Crear una nueva empresa si no existe
            const newCompany = await Empresa.create({ID_Municipio: data.municipio, Nombre: data.Nombre, CIF: data.CIF});
            console.log('Empresa creada:', newCompany);

            // Crear la relación entre la nueva empresa y el usuario
            const userCompanyRelation = await UsuarioEmpresa.create({
                ID_Empresa: newCompany.ID,
                ID_Usuario: data.ID_Usuario
            });
            console.log('Relación Usuario-Empresa creada:', userCompanyRelation);

            return newCompany;
        } catch (error) {
            console.error('Error al crear Empresa:', error);
            throw error;
        }
    },
    getAllCompanies: async () => {
        try {
            const companies = await Empresa.findAll({
                include: {
                    model: Municipio,
                    attributes: ['Nombre', 'ID_Provincia']
                }
            });
            console.log('Todas las Empresas:', companies);
            return companies;
        } catch (error) {
            console.error('Error al obtener todas las Empresas:', error);
            throw error;
        }
    },
    getCompaniesByUserId: async (userId) => {
        try {
            const companies = await Empresa.findAll({
                include: [
                    {
                        model: User,
                        through: { attributes: [] }, // No necesitamos atributos de la tabla intermedia
                        where: { ID: userId },
                        attributes: [] // No necesitamos atributos del usuario
                    },
                    {
                        model: Municipio,
                        attributes: ['Nombre', 'ID_Provincia']
                    }
                ]
            });
            console.log(`Empresas del usuario ${userId}:`, companies);
            return companies;
        } catch (error) {
            console.error(`Error al obtener las Empresas del usuario ${userId}:`, error);
            throw error;
        }
    },
    getCompanyById: async (id) => {
        try {
            const company = await Empresa.findByPk(id, {
                include: {
                    model: Municipio,
                    attributes: ['Nombre']
                }
            });
            if (!company) {
                console.log('Empresa no encontrada:', id);
                return null;
            }
            console.log('Empresa encontrada:', company);
            return company;
        } catch (error) {
            console.error('Error al obtener Empresa por ID:', error);
            throw error;
        }
    },
    getCompanyByCIF: async (CIF) => {
        try {
            const company = await Empresa.findOne({
                where: { CIF },
                include: [
                    {
                        model: Municipio,
                        attributes: ['Nombre', 'ID_Provincia']
                    }
                ]
            });
            if (!company) {
                console.log('Empresa no encontrada:', CIF);
                return null;
            }
            console.log('Empresa encontrada:', company);
            return company;
        } catch (error) {
            console.error('Error al obtener Empresa por CIF:', error);
            throw error;
        }
    },
    updateCompanyByID: async (id, CIF, name, user, ccaa, provincia, municipio) => {
        try {
            const company = await Empresa.findByPk(id);
            if (!company) {
                console.log('Empresa no encontrada:', id);
                return null;
            }
            await company.update(id, CIF, name, user, ccaa, provincia, municipio);
            console.log('Empresa actualizada:', company);
            return company;
        } catch (error) {
            console.error('Error al actualizar Empresa:', error);
            throw error;
        }
    },
    updateCompanyByCIF: async (CIF, data) => {
        try {
            const company = await companyService.getCompanyByCIF(CIF);
            if (!company) {
                console.log('Empresa no encontrada:', CIF);
                return null;
            }
            await company.update(data);
            console.log('Empresa actualizada:', company);
            return company;
        } catch (error) {
            console.error('Error al actualizar Empresa:', error);
            throw error;
        }
    },
    deleteUserCompanyRelation: async (userId, companyId) => {
        try {
            const userCompanyRelation = await UsuarioEmpresa.findOne({
                where: {
                    ID_Usuario: userId,
                    ID_Empresa: companyId
                }
            });
            if (!userCompanyRelation) {
                console.log('Relación Usuario-Empresa no encontrada:', userId, companyId);
                return null;
            }
            await userCompanyRelation.destroy();
            console.log('Relación Usuario-Empresa eliminada:', userId, companyId);
            return userCompanyRelation;
        } catch (error) {
            console.error('Error al eliminar la relación Usuario-Empresa:', error);
            throw error;
        }
    },
    deleteCompanyRelations: async (companyId) => {
        try {
            const userCompanyRelations = await UsuarioEmpresa.findAll({
                where: { ID_Empresa: companyId }
            });
            if (userCompanyRelations.length === 0) {
                console.log('Relaciones Usuario-Empresa no encontradas:', companyId);
                return null;
            }
            await userCompanyRelations.destroy();
            console.log('Relaciones Usuario-Empresa eliminadas:', companyId);
            return userCompanyRelations;
        } catch (error) {
            console.error('Error al eliminar las relaciones Usuario-Empresa:', error);
            throw error;
        }
    },

    deleteCompanyById: async (id) => {
        try {
            const company = await Empresa.findByPk(id);
            if (!company) {
                console.log('Empresa no encontrada:', id);
                return null;
            }
            await company.destroy();
            console.log('Empresa eliminada:', id);
            return company;
        } catch (error) {
            console.error('Error al eliminar Empresa:', error);
            throw error;
        }
    },
    deleteCompanyByCIF: async (CIF) => {
        try {
            const company = await companyService.getCompanyByCIF(CIF);
            if (!company) {
                console.log('Empresa no encontrada:', CIF);
                return null;
            }
            await company.destroy();
            console.log('Empresa eliminada:', CIF);
            return company;
        } catch (error) {
            console.error('Error al eliminar Empresa:', error);
            throw error;
        }
    }
}

export default companyService;