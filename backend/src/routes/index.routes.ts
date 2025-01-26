import { appointmentRouter } from "./appointments.routes.ts";
import { chiefComplaintRouter } from "./chiefComplaints.routes.ts";
import { patientRouter } from "./patients.routes.ts";
import { consultationRouter } from "./consultations.routes.ts";
import { resourceRouter } from "./resources.routes.ts";
import { templateRouter } from "./templates.routes.ts";
import { reportRouter } from "./reports.routes.ts";
import { userRouter } from "./users.routes.ts";
import { sessionRouter } from "./sessions.routes.ts";

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
