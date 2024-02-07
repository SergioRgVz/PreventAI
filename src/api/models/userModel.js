/**
 * Modelo de usuario para la aplicación.
 * Define la estructura de datos para los usuarios, incluyendo email, contraseña, nombre, y otros campos relevantes.
 * @module models/userModel
 */

import mongoose from '../../../config/db.js';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  telephone: { type: String, required: true, trim: true },
  role: { type: String, required: true, trim: true, lowercase: true },
});

const User = mongoose.model('User', userSchema);

export default User;
