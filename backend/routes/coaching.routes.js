import express from 'express';
import { authMiddleware } from '../middleware/auth';
import { registerCoaching, getCoachingDetails, createPaymentSession } from '../controllers/coaching';

const router = express.Router();

router.post('/register', authMiddleware, registerCoaching);
router.get('/details', authMiddleware, getCoachingDetails);
router.post('/create-payment', authMiddleware, createPaymentSession);

export default router;
