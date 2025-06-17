import asyncHandler from 'express-async-handler';
import Prompt from '../models/Prompt.js';
import { generateFiles } from '../utils/extensionGenerator.js';
import { bundleZip } from '../utils/zipBundler.js';

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
