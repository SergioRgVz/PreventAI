import express from 'express';
import { login, register, verifyToken } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/verifyToken', verifyToken);

export default router;