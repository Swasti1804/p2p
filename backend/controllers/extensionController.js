import asyncHandler from 'express-async-handler';
import Prompt from '../models/prompt.js';
import { generateFiles } from '../utils/extensionGenerator.js';
import { bundleZip } from '../utils/zipBundler.js';

// @desc    Generate extension from prompt
// @route   POST /api/extensions/generate
// @access  Private
export const generateExtension = asyncHandler(async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    res.status(400);
    throw new Error('Prompt is required');
  }

  const newPrompt = await Prompt.create({
    user: req.user._id,
    promptText: prompt,
    generatedCode: '// your AI-generated code here', // Replace this line with real AI logic
    status: 'completed',
  });

  res.status(201).json({ message: 'Extension generated successfully', promptId: newPrompt._id });
});

// @desc    Download generated extension as .zip
// @route   GET /api/extensions/:promptId/download
// @access  Private
export const downloadExtension = asyncHandler(async (req, res) => {
  const { promptId } = req.params;

  const prompt = await Prompt.findById(promptId);

  if (!prompt) {
    res.status(404);
    throw new Error('Prompt not found');
  }

  // Check if the current user owns this prompt
  if (prompt.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to access this extension');
  }

  // Check if generation is complete
  if (prompt.status !== 'completed') {
    res.status(400);
    throw new Error('Extension generation not completed yet');
  }

  const extensionFiles = await generateFiles(prompt.generatedCode, promptId);
  const zipBuffer = await bundleZip(extensionFiles, promptId);

  res.set({
    'Content-Type': 'application/zip',
    'Content-Disposition': `attachment; filename="extension-${promptId}.zip"`,
  });

  res.send(zipBuffer);
});
