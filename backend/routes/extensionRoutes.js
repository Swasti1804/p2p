import express from 'express';
import { downloadExtension } from '../controllers/extensionController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:promptId/download', protect, downloadExtension);

export default router;
