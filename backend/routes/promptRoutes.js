import express from "express";
import { submitPrompt, getPromptHistory } from "../controllers/promptController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/prompts — Submit new prompt
router.post("/", protect, submitPrompt);

// GET /api/prompts/history — Get all prompts by the user
router.get("/history", protect, getPromptHistory);

export default router;
