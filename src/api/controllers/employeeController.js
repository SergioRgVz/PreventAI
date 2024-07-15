import employeeService from '../services/employeeService.js';

class employeeController {
    async getEmployees(req, res) {
        try {
            const userId = req.user.userId;
            const empleados = await employeeService.getEmployees(userId);
            if (empleados.length) {
                res.status(200).json(empleados);
            } else {
                res.status(404).json({ message: 'No se encontraron empleados' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener empleados', error: error.message });
        }
    }

    async getEmployeesByCompanyId(req, res) {
        try {
            const userId = req.user.userId; // Suponiendo que el userId viene del middleware de autenticación
            const companyId = req.params.companyId;
            const empleados = await employeeService.getEmployeesByCompanyId(userId, companyId);
            if (empleados.length) {
                res.status(200).json(empleados);
            } else {
                res.status(404).json({code: 404, message: 'No se encontraron empleados para la empresa especificada' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener empleados por ID de empresa', error: error.message });
        }
    }

    async getEmployeeById(req, res) {
        try {
            const userId = req.user.userId; // Suponiendo que el userId viene del middleware de autenticación
            const employeeId = req.params.employeeId;
            const empleado = await employeeService.getEmployeeById(userId, employeeId);
            if (empleado) {
                res.status(200).json(empleado);
            } else {
                res.status(404).json({ message: 'Empleado no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener empleado por ID', error: error.message });
        }
    }

    async getEmployeeByDNI(req, res) {
        try {
            const userId = req.user.userId; // Suponiendo que el userId viene del middleware de autenticación
            const DNI = req.params.DNI;
            const empleado = await employeeService.getEmployeeByDNI(userId, DNI);
            if (empleado) {
                res.status(200).json(empleado);
            } else {
                res.status(404).json({ code: 404, message: 'Empleado no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener empleado por DNI', error: error.message });
        }
    }

    async createEmployee(req, res) {
        try {
            const userId = req.user.userId; // Suponiendo que el userId viene del middleware de autenticación
            const { DNI, Nombre, Apellidos, Telefono, Correo, Edad, Sexo, PuestoTrabajo, FechaNacimiento, ID_Empresa } = req.body;
            const result = await employeeService.createEmployee(userId, DNI, Nombre, Apellidos, Telefono, Correo, Edad, Sexo, PuestoTrabajo, FechaNacimiento, ID_Empresa);

            if (result.status === 'success') {
                res.status(201).json(result.data); // Cambiado a 201 para indicar creación exitosa
            } else {
                res.status(result.code).json({ message: result.message });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al crear empleado', error: error.message });
        }
    }


    async updateEmployee(req, res) {
        try {
            const userId = req.user.userId; // Suponiendo que el userId viene del middleware de autenticación
            const employeeDNI = req.params.employeeDNI;
            const employee = await employeeService.getEmployeeById(userId, employeeDNI);
            const { DNI, Nombre, Apellidos, Telefono, Correo, Edad, Sexo, PuestoTrabajo, FechaNacimiento, ID_Empresa } = req.body;
            let empleadoActualizado = null;
            try{
                empleadoActualizado = await employeeService.updateEmployee(userId, employee.ID, DNI, Nombre, Apellidos, Telefono, Correo, Edad, Sexo, PuestoTrabajo, FechaNacimiento, ID_Empresa);

            } catch (error) {
                res.status(400).json({ code: 400, message: 'No se pudo actualizar el empleado' });
            }
            if (empleadoActualizado) {
                res.status(200).json(empleadoActualizado);
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar empleado', error: error.message });
        }
    }

    async deleteEmployee(req, res) {
        try {
            const userId = req.user.userId; // Suponiendo que el userId viene del middleware de autenticación
            const employeeDNI = req.params.employeeDNI;
            const empleadoEliminado = await employeeService.deleteEmployee(userId, employeeDNI);
            if (empleadoEliminado) {
                res.status(200).json({ message: 'Empleado eliminado', empleado: empleadoEliminado });
            } else {
                res.status(400).json({code:400, message: 'No se pudo eliminar el empleado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar empleado', error: error.message });
        }
    }
}

export default new employeeController();
