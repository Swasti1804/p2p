import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import promptRoutes from './routes/promptRoutes.js';
import extensionRoutes from './routes/extensionRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

// Check OpenRouter API key presence
if (!process.env.OPENROUTER_API_KEY) {
  console.error("❌ OPENROUTER_API_KEY not found in .env file");
  process.exit(1); // Exit the app if key is missing
}

// Optional debug log (can be removed later)
console.log("✅ OpenRouter Key loaded:", process.env.OPENROUTER_API_KEY.slice(0, 8) + '...');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Auth route logger (optional)
app.use('/api/auth', (req, res, next) => {
  console.log('➡️ Incoming auth request:', req.method, req.url);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/prompts', promptRoutes);
app.use('/api/extensions', extensionRoutes);

// Error handlers
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
