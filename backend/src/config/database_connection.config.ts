import mongoose from "mongoose";
import { logger } from "../utils/logger.js";
import { envConfig } from "./env.config.js";

export class DatabaseConnection {
  private static instance: DatabaseConnection | undefined;

  constructor() {
    mongoose.connect(envConfig.mongoUrl).catch((err) => {
      console.error("Cannot connect to database: ", err);
      process.exit();
    });
  }

  static getInstance() {
    if (this.instance) {
      logger.warning("Already connected to DB");
      return this.instance;
    }

    logger.info("Connected to DB");
    this.instance = new DatabaseConnection();
    return this.instance;
  }
}
