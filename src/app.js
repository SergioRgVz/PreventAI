import express from 'express'
import * as dotenv from 'dotenv'
import path from 'path';
import cors from 'cors';
import authRoutes from './api/routes/authRoutes.js';
import companyRoutes from './api/routes/companyRoutes.js';
import employeeRoutes from './api/routes/employeeRoutes.js';
import { verifyToken } from './api/controllers/authController.js';
import {connectDB} from '../config/db.js';

dotenv.config({path:'../.env'})

// Database connection
connectDB();

const app = express();
const __dirname = path.resolve();
const buildPath = path.join(__dirname, '../client/dist');

// Middleware para servir archivos estáticos
app.use(express.static(buildPath));

//sincronizar con el frontend
app.use(cors({
    // origin: 'http://localhost:${port}', 
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
      exposedHeaders: 'Authorization',
  }));
  
app.use(express.json()) //Para que el servidor entienda json

// Rutas API

// Ruta raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Capturar todas las demás rutas no definidas y posiblemente servir index.html para SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.use('/auth', authRoutes);
app.use(verifyToken);
app.use('/company', companyRoutes);
app.use('/employee', employeeRoutes);

function listEndpoints(app) {
  const routes = [];
  
  app._router.stack.forEach(middleware => {
    if (middleware.route) {
      const { path, methods } = middleware.route;
      const methodNames = Object.keys(methods).filter(method => methods[method]).join(', ').toUpperCase();
      routes.push(`${methodNames} ${path}`);
    } else if (middleware.name === 'router') { // para rutas cargadas mediante express.Router
      middleware.handle.stack.forEach(handler => {
        const { route } = handler;
        if (route) {
          const methodNames = Object.keys(route.methods).filter(method => route.methods[method]).join(', ').toUpperCase();
          routes.push(`${methodNames} ${route.path}`);
        }
      });
    }
  });

  return routes;
}

// console.log(listEndpoints(app));

export default app;