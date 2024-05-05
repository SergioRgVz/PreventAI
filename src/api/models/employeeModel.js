/**
 * Modelo de empleado para la aplicación.
 * 
 * Este modelo define la estructura de datos para los empleados, incluyendo su DNI, nombre,
 * apellidos, teléfono, edad, la compañía a la que están asociados y su fecha de nacimiento.
 * Cada campo tiene sus propias validaciones, como la obligatoriedad y la configuración de
 * formato (por ejemplo, trim y lowercase para strings).
 * 
 * @module models/Employee
 */

import { Schema } from 'mongoose';
import mongoose from '../../../config/db.js';
 
const employeeSchema = new mongoose.Schema({
    DNI: { type: String, required: true, trim: true }, 
    name: { type: String, required: true, trim: true },
    surname: { type: String, required: true, trim: true },
    telephone: { type: String, required: true, trim: true },
    age: { type: Number, required: true },
    company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    work_center: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    birth_date: { type: Date, required: true },
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
