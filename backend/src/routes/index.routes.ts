import { appointmentRouter } from "./appointments.routes.js";
import { chiefComplaintRouter } from "./chiefComplaints.routes.js";
import { patientRouter } from "./patients.routes.js";
import { consultationRouter } from "./consultations.routes.js";
import { resourceRouter } from "./resources.routes.js";
import { templateRouter } from "./templates.routes.js";
import { reportRouter } from "./reports.routes.js";
import { userRouter } from "./users.routes.js";
import { sessionRouter } from "./sessions.routes.js";

export const router = {
  appointmentRouter,
  chiefComplaintRouter,
  patientRouter,
  consultationRouter,
  resourceRouter,
  templateRouter,
  reportRouter,
  userRouter,
  sessionRouter,
};
