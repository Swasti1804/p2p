import Prompt from '../models/prompt.js';
import { generateLLMResponse } from '../utils/openaiApi.js';

// Submit a new prompt and store the response
export const submitPrompt = async (req, res) => {
  try {
    const { promptText } = req.body;

    if (!promptText) {
      return res.status(400).json({ message: 'Prompt text is required.' });
    }

    // Generate response using OpenRouter LLM
    const responseText = await generateLLMResponse(promptText);

    // Save to DB
    const savedPrompt = await Prompt.create({
      user: req.user._id,
      promptText,
      responseText,
    });

    res.status(201).json(savedPrompt);
  } catch (error) {
    console.error('Error processing prompt:', error.message);
    res.status(500).json({ message: 'Failed to generate response.' });
  }
};

// Get prompt history for the authenticated user
export const getPromptHistory = async (req, res) => {
  try {
    const prompts = await Prompt.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(prompts);
  } catch (error) {
    console.error('Error fetching prompt history:', error.message);
    res.status(500).json({ message: 'Failed to fetch prompt history.' });
  }
};
