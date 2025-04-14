import "dotenv/config";
import express from "express";
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";
import { DatabaseConnection } from "./config/database_connection.config";
import { router } from "./routes/index.routes";
import { logger } from "./utils/logger";
import { errorHandler } from "./middlewares/errorHandler";
import { initializePassport } from "./config/passport.config";

const app = express();

const PORT = process.env.PORT || 8080;

/* CORS Settings */
const FRONTEND_URL = "https://apexacupuntura.netlify.app";
const DEVELOPMENT_URL = "http://localhost:5173";
const allowedOrigins = [FRONTEND_URL, DEVELOPMENT_URL];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Origen no permitido por CORS"));
      }
    },
    credentials: true,
  })
);

/* Passport init */
initializePassport();
passport.initialize();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes middlewares */
app.use("/api/patients", router.patientRouter);
app.use("/api/chiefcomplaints", router.chiefComplaintRouter);
app.use("/api/consultations", router.consultationRouter);
app.use("/api/appointments", router.appointmentRouter);
app.use("/api/resources", router.resourceRouter);
app.use("/api/templates", router.templateRouter);
app.use("/api/reports", router.reportRouter);
app.use("/api/users", router.userRouter);
app.use("/api/sessions", router.sessionRouter);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  DatabaseConnection.getInstance();
});

app.get("/", (req, res) => {
  res.send("Success!");
});

app.use(errorHandler);

export default app;
