import express from 'express';
import { authMiddleware } from '../middleware/auth';
import { getNearbyCoachingCenters } from '../controllers/student';

const router = express.Router();

router.get('/nearby-coaching', authMiddleware, getNearbyCoachingCenters);

export default router;
