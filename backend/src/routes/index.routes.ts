import { appointmentRouter } from "./appointments.routes";
import { chiefComplaintRouter } from "./chiefComplaints.routes";
import { patientRouter } from "./patients.routes";
import { consultationRouter } from "./consultations.routes";
import { resourceRouter } from "./resources.routes";
import { templateRouter } from "./templates.routes";
import { reportRouter } from "./reports.routes";
import { userRouter } from "./users.routes";
import { sessionRouter } from "./sessions.routes";

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
