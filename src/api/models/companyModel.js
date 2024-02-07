/**
 * Modelo de empresa para la aplicación.
 * Define la estructura de datos para las empresas, incluyendo CIF, nombre, y relaciones con usuarios y ubicaciones.
 * @module models/companyModel
 */

import { Schema } from 'mongoose';
import mongoose from '../../../config/db.js';

const companySchema = new mongoose.Schema({
    CIF: { type: String, required: true, unique: true, trim: true, lowercase: true},
    name: { type: String, required: true },
    User: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    ccaa: { type: String, required: true },
    provincia: { type: String, required: true },
    municipio: { type: String, required: true }
});

const Company = mongoose.model('Company', companySchema);

export default Company;