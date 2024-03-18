import express from 'express'
import * as dotenv from 'dotenv'
import path from 'path';
import cors from 'cors';
import authRoutes from './api/routes/authRoutes.js';
import companyRoutes from './api/routes/companyRoutes.js';
import employeeRoutes from './api/routes/employeeRoutes.js';
import { verifyToken } from './api/controllers/authController.js';
import { connectDB } from '../config/db.js';

dotenv.config({path:'../.env'})

// Database connection
connectDB();

const app = express();
const __dirname = path.resolve();
const buildPath = path.join(__dirname, '../client/dist');

app.use(express.json()); // Para que el servidor entienda JSON
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
    exposedHeaders: 'Authorization',
}));

// Rutas API
app.use('/auth', authRoutes); // La autenticación no requiere token
app.use('/company', verifyToken, companyRoutes); // Estas rutas requieren autenticación
app.use('/employee', verifyToken, employeeRoutes); // Estas rutas requieren autenticación

// Middleware para servir archivos estáticos
app.use(express.static(buildPath));

// Ruta raíz para SPA
app.get('/', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Capturar todas las demás rutas no definidas y servir index.html para SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

export default app;
