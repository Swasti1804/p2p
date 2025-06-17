import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import promptRoutes from "./routes/promptRoutes.js";
import cors from "cors";
import extensionRoutes from './routes/extensionRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use("/api/auth", (req, res, next) => {
  console.log("Incoming auth request:", req.method, req.url);
  next();
});
app.use("/api/auth", authRoutes);
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);

app.use('/api/prompts', promptRoutes);
app.use('/api/extensions', extensionRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
