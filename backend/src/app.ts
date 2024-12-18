import express from "express";
import DatabaseConnection from "./config/database_connection.ts";
import patientRouter from "./routes/patients.routes.ts";
import { logger } from "./utils/logger.ts";

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes middlewares */
app.use("/api/patients", patientRouter);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  DatabaseConnection.getInstance();
});
