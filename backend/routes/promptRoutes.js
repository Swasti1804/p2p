import express from 'express';
import { submitPrompt, getPromptHistory } from '../controllers/promptController.js';
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();

// Route to submit a new prompt and get response from LLM
router.post('/generate', protect, submitPrompt);

// Route to get prompt history for authenticated user
router.get('/history', protect, getPromptHistory);

export default router;
