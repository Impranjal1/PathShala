import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { getNearbyCoachingCenters } from '../controllers/student.controllers.js';

const router = express.Router();

router.get('/nearby-coaching', authMiddleware, getNearbyCoachingCenters);

export default router;
