/**
 * Servicio para gestionar las operaciones de empleados en la base de datos.
 * Proporciona funciones para buscar, crear y eliminar empleados basados en diferentes criterios.
 * @module services/employeeService
 */

import {Empleado} from '../models/associations.js';
import {Empresa} from '../models/associations.js';
import userService from './userService.js';
import companyService from './companyService.js';
const employeeService = {

    getEmployees: async (userId) => {
        try {
            const esTecnico = await userService.checkIfTechnician(userId);

            let empleados = [];

            //Obtenemos las compañías del usuario para obtener los empleados
            if (esTecnico) {
                const companies = await companyService.getCompaniesByUserId(userId);
                const companyIds = companies.map(company => company.ID);

                empleados = await Empleado.findAll({
                    where: { ID_Empresa: companyIds },
                    include: {
                        model: Empresa,
                        attributes: ['CIF', 'Nombre'],
                    }
                });

            } else {
                empleados = await Empleado.findAll({
                    include: {
                        model: Empresa,
                        attributes: ['CIF', 'Nombre'],
                    }
                });
            }

            return empleados;
        } catch (error) {
            console.error('Error al obtener empleados:', error);
            return null;
        }
    },

    getEmployeesByCompanyId: async (userId, companyId) => {
        try {
            const esTecnico = await userService.checkIfTechnician(userId);
            let employees = null;
            
            if (esTecnico) {
                const companies = await companyService.getCompaniesByUserId(userId);
                if (!companies.some(c => c.ID === companyId)) {
                    console.log('La empresa no pertenece al usuario:', companyId);
                    return null;
                }
            }
            employees = await Empleado.findAll({
                where: { ID_Empresa: companyId },
                include: {
                    model: Empresa,
                    attributes: ['CIF', 'Nombre'],
                }
            });

            return employees;
        } catch (error) {
            console.error('Error al obtener empleados por ID de empresa:', error);
            return null;
        }
    },


    getEmployeeById: async (userId, employeeId) => {
        try {
            const esTecnico = await userService.checkIfTechnician(userId);
            let employee = null;

            if (esTecnico) {
                const companies = await companyService.getCompaniesByUserId(userId);
                const companyIds = companies.map(company => company.ID);

                employee = await Empleado.findOne({
                    where: { ID: employeeId, ID_Empresa: companyIds },
                    include: {
                        model: Empresa,
                        attributes: ['CIF', 'Nombre'],
                    }
                });

            } else {
                employee = await Empleado.findByPk(employeeId, {
                    include: {
                        model: Empresa,
                        attributes: ['CIF', 'Nombre'],
                    }
                });
            }

            return employee;
        } catch (error) {
            console.error('Error al obtener empleado por ID:', error);
            return null;
        }
    },

    getEmployeeByDNI: async (userId, DNI) => {
        try {
            const esTecnico = await userService.checkIfTechnician(userId);
            let employee = null;

            if (esTecnico) {
                const companies = await companyService.getCompaniesByUserId(userId);
                const companyIds = companies.map(company => company.ID);

                employee = await Empleado.findOne({
                    where: { DNI, ID_Empresa: companyIds },
                    include: {
                        model: Empresa,
                        attributes: ['CIF', 'Nombre'],
                    }
                });
            } else {
                employee = await Empleado.findOne({
                    where: { DNI },
                    include: {
                        model: Empresa,
                        attributes: ['CIF', 'Nombre'],
                    }
                });
            }
            return employee;
        } catch (error) {
            console.error('Error al obtener empleado por DNI:', error);
            return null;
        }
    },

    createEmployee: async (userId, DNI, Nombre, Apellidos, Telefono, Correo, Edad, Sexo, PuestoTrabajo, FechaNacimiento, ID_Empresa) => {
        try {
            const esTecnico = await userService.checkIfTechnician(userId);
    
            // Comprobar que la empresa existe
            const company = await companyService.getCompanyById(ID_Empresa);
            if (!company) {
                console.log('Empresa no encontrada:', ID_Empresa);
                return { status: 'error', code: 404, message: 'Empresa no encontrada' };
            }
    
            if (esTecnico) {
                const companies = await companyService.getCompaniesByUserId(userId);
                if (!companies.some(c => c.ID === company.ID)) {
                    console.log('La empresa no pertenece al usuario:', company);
                    return { status: 'error', code: 403, message: 'La empresa no pertenece al usuario' };
                }
            }
    
            const employee = await Empleado.create({
                DNI,
                Nombre,
                Apellidos,
                Telefono,
                Correo,
                Edad,
                Sexo,
                PuestoTrabajo,
                FechaNacimiento,
                ID_Empresa
            });
    
            console.log('Empleado creado:', employee);
            return { status: 'success', data: employee };
    
        } catch (error) {
            console.error('Error al crear empleado:', error);
            throw error;
        }
    },

    updateEmployee: async (userId, employeeId, DNI, Nombre, Apellidos, Telefono, Correo, Edad, Sexo, PuestoTrabajo, FechaNacimiento, ID_Empresa) => {
        try {
            const esTecnico = await userService.checkIfTechnician(userId);

            //Comprobar que el empleado existe
            const employee = await Empleado.findByPk(employeeId);
            if (!employee) {
                console.log('Empleado no encontrado:', employeeId);
                return null;
            }

            //Comprobar que la empresa existe
            const company = await companyService.getCompanyById(ID_Empresa);
            if (!company) {
                console.log('Empresa no encontrada:', ID_Empresa);
                return null;
            }

            if (esTecnico) {
                const companies = await companyService.getCompaniesByUserId(userId);
                if (!companies.some(c => c.ID === company.ID)) {
                    console.log('La empresa no pertenece al usuario:', company);
                    return null;
                }
            }

            await Empleado.update({
                DNI,
                Nombre,
                Apellidos,
                Telefono,
                Correo,
                Edad,
                Sexo,
                PuestoTrabajo,
                FechaNacimiento,
                ID_Empresa
            }, {
                where: { ID: employeeId }
            });

            console.log('Empleado actualizado:', employee);
            return await Empleado.findByPk(employeeId);

        } catch (error) {
            console.error('Error al actualizar empleado:', error);
            throw error;
        }
    },

    deleteEmployee: async (userId, employeeId) => {
        try {
            const esTecnico = await userService.checkIfTechnician(userId);

            //Comprobar que el empleado existe
            const employee = await Empleado.findByPk(employeeId);
            if (!employee) {
                console.log('Empleado no encontrado:', employeeId);
                return null;
            }

            if (esTecnico) {
                const companies = await companyService.getCompaniesByUserId(userId);
                const companyIds = companies.map(company => company.ID);

                if (!companyIds.includes(employee.ID_Empresa)) {
                    console.log('La empresa no pertenece al usuario:', employee.ID_Empresa);
                    return null;
                }
            }

            await Empleado.destroy({ where: { ID: employeeId } });
            console.log('Empleado eliminado:', employee);
            return employee;

        } catch (error) {
            console.error('Error al eliminar empleado:', error);
            throw error;
        }
    },
};

export default employeeService;
