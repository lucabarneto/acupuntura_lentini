import mongoose from "mongoose";
import { IAppointment } from "../types/mongo/IAppointment.ts";
import { ModelMiddlewares } from "./modelMiddlewares.ts";
import { patientMiddlewares } from "./patient.model.ts";
import { DATE_REGEX, TIME_REGEX } from "../constants/constants.ts";

type AppointmentModel = mongoose.Model<IAppointment>;

const APPOINTMENT_COLLECTION = "appointments";

const AppointmentSchema = new mongoose.Schema<IAppointment, AppointmentModel>({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  date: {
    type: String,
    required: true,
    match: DATE_REGEX,
  },
  time: {
    type: String,
    required: true,
    match: TIME_REGEX,
  },
  patient_is_notified: {
    type: Boolean,
    default: false,
  },
  expired: {
    type: Boolean,
    default: false,
  },
  patient_assisted: {
    type: Boolean,
    default: false,
  },
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: "patients",
    required: true,
  },
});

/* :: Schema middlewares :: */

AppointmentSchema.pre("deleteOne", async function () {
  const appointment = (await this.model.findOne(
    this.getQuery()
  )) as IAppointment;

  await patientMiddlewares.removeDeletedReferenceFromDocument(
    { id: appointment._id!, key: "appointments" },
    appointment.patient.toString()
  );
});

AppointmentSchema.pre("save", async function () {
  const patient = await patientMiddlewares.checkForNonExistingDocument(
    this.patient.toString()
  );

  await patientMiddlewares.addReferenceToDocument(
    { id: this._id, key: "appointments" },
    patient
  );
});

export const AppointmentModel = mongoose.model<IAppointment, AppointmentModel>(
  APPOINTMENT_COLLECTION,
  AppointmentSchema
);

class AppointmentMiddlewares extends ModelMiddlewares<IAppointment> {}
export const appointmentMiddlewares = new AppointmentMiddlewares(
  AppointmentModel
);
