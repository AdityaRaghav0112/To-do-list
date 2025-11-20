import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import cors from "cors";
import ErrorLog from "./models/ErrorLog"; // Error log model

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// 404 Route handler
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  (error as any).status = 404;
  next(error);
});

// Centralized Error Handler
app.use(async (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  // Save error to MongoDB
  try {
    await ErrorLog.create({
      message: err.message || "Unknown error",
      stack: err.stack,
      route: req.originalUrl,
      method: req.method,
    });
  } catch (mongoErr) {
    console.error("Failed to log error to MongoDB", mongoErr);
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
