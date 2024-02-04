import Usuario from '../models/userModel';

// Función para crear un nuevo usuario
export const crearUsuario = async (req, res) => {
  try {
    let { email, contraseña } = req.body;
    let usuario = new Usuario({ email, contraseña });
    await usuario.save();
    res.status(201).send(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear el usuario');
  }
};