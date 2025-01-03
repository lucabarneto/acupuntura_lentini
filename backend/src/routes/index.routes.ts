import appointmentRouter from "./appointments.routes.ts";
import chiefComplaintRouter from "./chiefComplaints.routes.ts";
import patientRouter from "./patients.routes.ts";
import sessionRouter from "./sessions.routes.ts";
import resourceRouter from "./resources.routes.ts";

export const router = {
  appointmentRouter,
  chiefComplaintRouter,
  patientRouter,
  sessionRouter,
  resourceRouter,
};
