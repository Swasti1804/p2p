export const generateFiles = async (aiGeneratedCodeString, promptId) => {
  try {
    const files = JSON.parse(aiGeneratedCodeString);

    // Validate required files
    if (!files['manifest.json']) {
      throw new Error('Missing manifest.json in AI output');
    }

    // Add default popup.html if not present
    if (!files['popup.html']) {
      files['popup.html'] = `
        <!DOCTYPE html>
        <html>
          <head><title>Popup</title></head>
          <body><h1>Hello from Extension!</h1></body>
        </html>
      `;
    }

    // Return as array of { fileName, content }
    return Object.entries(files).map(([fileName, content]) => ({
      fileName,
      content,
    }));
  } catch (err) {
    throw new Error(`Failed to parse generated code: ${err.message}`);
  }
};
