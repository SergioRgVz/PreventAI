import userService from '../services/userService.js';
import jwt from 'jsonwebtoken';

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
        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY_JWT, { expiresIn: '24h' });
        return res.status(200).json({ message: 'success', token });
    } catch (error){
        console.log(error)
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(403).send('Se requiere un token para autenticación');

    jwt.verify(token, process.env.SECRET_KEY_JWT, (err, decoded) => {
        if (err) return res.status(401).send('Token inválido');
        req.userId = decoded.userId;
        res.status(200).send('Token válido');
        next();
    });
};

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