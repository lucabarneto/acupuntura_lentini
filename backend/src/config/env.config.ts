import { config as loadEnv } from "dotenv";
import { Command } from "commander";
import { logger } from "../utils/logger.js";

const program = new Command();
program
  .option(
    "--load-env",
    "loads env variables from .env file (development)",
    false
  )
  .option("--env-path", "custom path for .env", ".env")
  .parse(process.argv);

const options = program.opts();

const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`Undefined ENV variable '${key}'`);
  return value;
};

const loadConfig = () => {
  if (options.loadEnv) {
    loadEnv({ path: options.envPath });
    logger.info("env variables loaded from local .env file");
  }

  console.log(
    process.env.ENVIRONMENT,
    process.env.PERSISTENCE,
    process.env.SECRET_KEY,
    process.env.MONGO_URI,
    process.env.CLOUDINARY_URI
  );

  return {
    environment: process.env.ENVIRONMENT,
    persistence: getEnv("PERSISTENCE"),
    jwtSecret: getEnv("SECRET_KEY"),
    mongoUri: getEnv("MONGO_URI"),
    cloudinaryURI: getEnv("CLOUDINARY_URI"),
  };
};

export const envConfig = loadConfig();
