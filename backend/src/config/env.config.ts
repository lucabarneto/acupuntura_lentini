import { config as loadEnv } from "dotenv";
import { logger } from "../utils/logger.js";

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  loadEnv();
  logger.info("✅ loaded variables from .env");
}

const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`Undefined env variable '${key}'`);
  return value;
};

export const envConfig = {
  environment: getEnv("ENVIRONMENT"),
  persistence: getEnv("PERSISTENCE"),
  jwtSecret: getEnv("SECRET_KEY"),
  mongoUrl: getEnv("MONGO_URL"),
  cloudinaryUrl: getEnv("CLOUDINARY_URL"),
};
