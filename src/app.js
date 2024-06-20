import express from 'express'
import * as dotenv from 'dotenv'
import path from 'path';
import cors from 'cors';
import authRoutes from './api/routes/authRoutes.js';
import companyRoutes from './api/routes/companyRoutes.js';
import employeeRoutes from './api/routes/employeeRoutes.js';
import factorRoutes from './api/routes/factorRoutes.js';
import reportRoutes from './api/routes/reportRoutes.js';
import provinciaRoutes from './api/routes/provinciaRoutes.js';
import municipioRoutes from './api/routes/municipioRoutes.js';
import { verifyToken } from './api/controllers/authController.js';
import { connectMONGODB } from '../config/db.js';
import pool from './db/mariadb.js'; // Asegúrate de que la ruta es correcta
import sequelize from './db/mariadb.js';
import bodyParser from 'body-parser';
import multer from 'multer';

dotenv.config({ path: '../.env' })

// Database connection
// connectMONGODB();

const app = express();
const __dirname = path.resolve();
const buildPath = path.join(__dirname, '../client/dist');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Middleware de CORS
app.use(cors({
  origin: 'http://localhost:5173', // Cambia esto por la URL de tu frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: 'Authorization',
}));

// Middleware de body-parser
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Middleware para procesar JSON
app.use(express.json());

// Ruta para subir imágenes
app.post('/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    res.status(200).send({
      message: 'Imagen subida',
      filename: req.file.path
    });
  } else {
    res.status(500).send('Error al subir la imagen');
  }
});

// Rutas API
app.use('/provincia', provinciaRoutes);
app.use('/municipio', municipioRoutes);
app.use('/auth', authRoutes);
app.use('/factor', verifyToken, factorRoutes); // Estas rutas requieren autenticación
app.use('/company', verifyToken, companyRoutes); // Estas rutas requieren autenticación
app.use('/employee', verifyToken, employeeRoutes); // Estas rutas requieren autenticación
app.use('/report', verifyToken, reportRoutes); // Estas rutas requieren autenticación

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
