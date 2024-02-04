import userService from '../services/userService.js';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.validateUser(email, password);

        if(user === 0) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        if(user === 1) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        console.log(user);
        return res.status(200).json({ message: 'success', user });
    } catch (error){
        console.log(error)
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const register = async (req, res) => {
    try {
        const { email, password, name, surname, telephone} = req.body;
        const user = await userService.createUser(email, password, name, surname, telephone, 'technician');
        if(user === null) {
            return res.status(409).json({ message: 'El usuario ya existe' });
        }
        return res.status(201).json({ message: 'Usuario creado', user });
    } catch (error){
        console.log(error)
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}