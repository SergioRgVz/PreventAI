import express from 'express'
import * as dotenv from 'dotenv'
import path from 'path';
import cors from 'cors';
import authRoutes from './api/routes/authRoutes.js';
import companyRoutes from './api/routes/companyRoutes.js';
import employeeRoutes from './api/routes/employeeRoutes.js';
import reportRoutes from './api/routes/reportRoutes.js';
import { verifyToken } from './api/controllers/authController.js';
import { connectDB } from '../config/db.js';
// import multer from 'multer';

dotenv.config({path:'../.env'})

// Database connection
connectDB();

const app = express();
const __dirname = path.resolve();
const buildPath = path.join(__dirname, '../client/dist');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage });

// app.post('/upload', upload.single('image'), (req, res) => {
//   if(req.file) {
//     res.status(200).send({
//       message: 'Imagen subida',
//       filename: req.file.path
//     });
//     } else {
//       res.status(500).send('Error al subir la imagen');
//     }
// });


app.use(express.json()); // Para que el servidor entienda JSON
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: 'Authorization',
}));

// Rutas API
app.use('/auth', authRoutes); 
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
