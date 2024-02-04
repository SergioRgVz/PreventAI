import express from 'express'
import * as dotenv from 'dotenv'
import path from 'path';
import cors from 'cors';
import authRoutes from './api/routes/authRoutes.js';
import {connectDB} from '../config/db.js';
import userService  from './api/services/userService.js';
// import apiRouter from './api/routes/apiRoutes';

dotenv.config({path:'../.env'})

// Database connection
connectDB();

const app = express();
const __dirname = path.resolve();
const buildPath = path.join(__dirname, '../client/dist')

// Middleware para servir archivos estáticos
app.use(express.static(buildPath));

//sincronizar con el frontend
app.use(cors({
    origin: 'http://localhost:${port}', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  }));
  
app.use(express.json()) //Para que el servidor entienda json

// Rutas API
// app.use('/api', apiRouter);

app.use('/auth', authRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Ruta de prueba
app.get('/test', (req, res) => {
  res.send('Hello, World! test');
});

// const User = await userService.createUser('sergiorgvz@gmail.com', '1234');

// Capturar todas las demás rutas no definidas y posiblemente servir index.html para SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

export default app;