import express from "express";
import { DatabaseConnection } from "./config/database_connection.config.ts";
import { router } from "./routes/index.routes.ts";
import { logger } from "./utils/logger.ts";
import { errorHandler } from "./middlewares/errorHandler.ts";
import passport from "passport";
import { initializePassport } from "./config/passport.config.ts";

const app = express();

const PORT = process.env.PORT || 8080;

/* Passport init */
initializePassport();
passport.initialize();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes middlewares */
app.use("/api/patients", router.patientRouter);
app.use("/api/chiefcomplaints", router.chiefComplaintRouter);
app.use("/api/sessions", router.sessionRouter);
app.use("/api/appointments", router.appointmentRouter);
app.use("/api/resources", router.resourceRouter);
app.use("/api/templates", router.templateRouter);
app.use("/api/reports", router.reportRouter);
app.use("/api/users", router.userRouter);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  DatabaseConnection.getInstance();
});

app.use(errorHandler);

export default app;
