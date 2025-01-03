import express from "express";
import DatabaseConnection from "./config/database_connection.config.ts";
import { router } from "./routes/index.routes.ts";
import { logger } from "./utils/logger.ts";
import { errorHandler } from "./middlewares/errorHandler.ts";

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes middlewares */
app.use("/api/patients", router.patientRouter);
app.use("/api/chiefcomplaints", router.chiefComplaintRouter);
app.use("/api/sessions", router.sessionRouter);
app.use("/api/appointments", router.appointmentRouter);
app.use("/api/resources", router.resourceRouter);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  DatabaseConnection.getInstance();
});

app.use(errorHandler);

export default app;
