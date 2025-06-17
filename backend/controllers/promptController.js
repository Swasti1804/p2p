import Prompt from "../models/prompt.js";
// import { generateResponseFromPrompt } from "../utils/openaiApi.js";

// Submit a new prompt
export const submitPrompt = async (req, res) => {
  try {
    const { promptText } = req.body;

    if (!promptText) return res.status(400).json({ message: "Prompt is required." });

    const responseText = await generateResponseFromPrompt(promptText);

    const savedPrompt = await Prompt.create({
      user: req.user._id,
      promptText,
      responseText,
    });

    res.status(201).json(savedPrompt);
  } catch (error) {
    console.error("Error processing prompt:", error);
    res.status(500).json({ message: "Failed to generate response." });
  }
};

// Get prompt history
export const getPromptHistory = async (req, res) => {
  try {
    const prompts = await Prompt.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(prompts);
  } catch (error) {
    console.error("Error fetching prompt history:", error);
    res.status(500).json({ message: "Failed to fetch prompt history." });
  }
};
