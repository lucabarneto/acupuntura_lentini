import mongoose from "mongoose";
import { logger } from "../utils/logger.ts";

const MONGO_PASSWORD =
  "mongodb+srv://guillermolentini:rBN5qZP9Xr7UKrBd@acupunturalentini.ohffp.mongodb.net/";

class DatabaseConnection {
  private static instance: DatabaseConnection | undefined;

  constructor() {
    mongoose.connect(MONGO_PASSWORD).catch((err) => {
      console.error("Cannot connect to database: ", err);
      process.exit();
    });
  }

  static getInstance() {
    if (this.instance) {
      logger.warning("Already connected to DB");
      return this.instance;
    }

    this.instance = new DatabaseConnection();
    logger.info("Connected to DB");
    return this.instance;
  }
}

export default DatabaseConnection;
