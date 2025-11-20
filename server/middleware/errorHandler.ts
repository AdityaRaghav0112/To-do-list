import { Request, Response, NextFunction } from "express";
import ErrorLog from "../models/ErrorLog";
import ErrorResponse from "./ErrorResponse";

export const errorHandler = async (
  err: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Server Error:", err);

  // SAVE ERROR LOG TO MONGODB
  try {
    await ErrorLog.create({
      message: err.message,
      stack: err.stack || "",
      route: req.originalUrl,
      method: req.method,
    });
  } catch (dbError) {
    console.error("Error logging failed:", dbError);
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
