/**
 * Servicio para gestionar las operaciones de empleados en la base de datos.
 * Proporciona funciones para buscar, crear y eliminar empleados basados en diferentes criterios.
 * @module services/employeeService
 */

import Employee from "../models/employeeModel.js";
import Company from "../models/companyModel.js";
import mongoose from "mongoose";

/**
 * Service for managing employees.
 */
const employeeService = {
    /**
     * Busca un empleado por su DNI.
     * @param {string} DNI - El DNI del empleado a buscar.
     * @returns {Promise<Employee|null>} El empleado encontrado o null si no existe.
     */
    findEmployee: async (DNI) => {
        try {
            const employee = await Employee.findOne({ DNI }).exec();
            return employee;
        } catch (error) {
            return null;
        }
    },

    /**
     * Busca todos los empleados asociados a empresas relacionadas con un usuario.
     * @param {string} userId - El ID del usuario cuyas empresas se deben buscar.
     * @returns {Promise<Array<Employee>|null>} Una lista de empleados o null si hay un error.
     */
    findEmployeesByUserId: async (userId) => {
        try {
            const companies = await Company.find({ User: userId });
            const companyIds = companies.map(company => company._id);

            const employees = await Employee.find({ company: { $in: companyIds } }) 
            .populate({
                path: 'company', 
                select: 'CIF name' // Aquí especificas que quieres incluir el CIF y el nombre de la empresa
            })
            .select('-_id DNI name surname telephone age company work_center position birth_date');

            return employees;
        } catch (error) {
            console.error('Error al buscar empleados por ID de usuario:', error);
            return null;
        }
    },

    /**
     * Busca un empleado por su ID.
     * @param {string} id - El ID del empleado a buscar.
     * @returns {Promise<Employee|null>} El empleado encontrado o null si no existe.
     */
    findEmployeeById: async (id) => {
        try {
            const employee = await Employee.findById(id).exec();
            return employee;
        } catch (error) {
            return null;
        }
    },

    /**
     * Encuentra todos los empleados registrados.
     * @returns {Promise<Array<Employee>>} Una lista de todos los empleados.
     */
    findAllEmployees: async () => {
        try {
            const employees = await Employee.find().exec();
            return employees;
        } catch (error) {
            return null;
        }
    },

    /**
     * Crea un nuevo empleado en la base de datos.
     * @param {string} DNI - DNI del empleado.
     * @param {string} name - Nombre del empleado.
     * @param {string} surname - Apellido del empleado.
     * @param {string} telephone - Teléfono del empleado.
     * @param {number} age - Edad del empleado.
     * @param {Schema.Types.ObjectId} company - La compañía asociada al empleado.
     * * @param {string} work_center - Centro de trabajo del empleado.
     * * @param {string} position - Puesto de trabajo del empleado.
     * @param {Date} birth_date - Fecha de nacimiento del empleado.
     * @returns {Promise<Employee|null>} El empleado creado o null si el empleado ya existe.
     */
    createEmployee: async (DNI, name, surname, telephone, age, company, work_center, position, birth_date) => {
        try {
            let employee = await employeeService.findEmployee(DNI);
            if (employee) {
                console.log('Employee already exists:', employee);
                return null;
            }
            employee = await Employee.create({
                DNI: DNI,
                name: name,
                surname: surname,
                telephone: telephone,
                age: age,
                company: company,
                work_center: work_center,
                position: position,
                birth_date: birth_date
            });
            console.log('Employee created:', employee);
            return employee;
        } catch (error) {
            console.error('Error creating employee:', error);
            throw error;
        }
    },
    updateEmployee: async (DNI, name, surname, telephone, age, company, work_center, position, birth_date) => {
        try {
            let employee = await employeeService.findEmployee(DNI);
            if (!employee) {
                console.log('Employee does not exist:', employee);
                return null;
            }
            employee = await Employee.updateOne({ DNI: DNI }, {
                name: name,
                surname: surname,
                telephone: telephone,
                age: age,
                company: company,
                work_center: work_center,
                position: position,
                birth_date: birth_date
            });
            console.log('Employee updated:', employee);
            return employee;
        } catch (error) {
            console.error('Error updating employee:', error);
            throw error;
        }
    },


    /**
     * Elimina un empleado por su DNI.
     * @param {string} DNI - DNI del empleado a eliminar.
     * @returns {Promise<Employee|null>} El empleado eliminado o null si no se encuentra.
     */
    deleteEmployee: async (DNI) => {
        try {
            const employee = await employeeService.findEmployee(DNI);
            if (!employee) {
                console.log('Employee does not exist:', employee);
                return null;
            }
            await Employee.deleteOne({ DNI: DNI }).exec();
            console.log('Employee deleted:', employee);
            return employee;
        } catch (error) {
            console.error('Error deleting employee:', error);
            throw error;
        }
    }
};

export default employeeService;
