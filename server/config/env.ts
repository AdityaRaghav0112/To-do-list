import dotenv from "dotenv";
dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error("❌ JWT_SECRET is missing in .env");
}

export const ENV = {
  MONGO_URI: process.env.MONGO_URI || "",
  JWT_SECRET: process.env.JWT_SECRET,           // now always string
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  PORT: process.env.PORT || "5000",
};
