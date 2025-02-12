import express from 'express';
import { register, verifyEmail, updateUser, getUser } from '../controllers/auth.controllers.js';
import { authMiddleware } from '../middleware/auth.js';


const router = express.Router();

router.post('/register', register);
router.post('/update-user', authMiddleware, updateUser);
router.get('/user', authMiddleware, getUser);
router.post('/verify-email', authMiddleware, verifyEmail);

export default router;