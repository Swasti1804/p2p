import express from 'express';
import { generateExtension, downloadExtension } from '../controllers/extensionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/generate", protect, generateExtension);
router.get("/:promptId/download", protect, downloadExtension);

export default router;
