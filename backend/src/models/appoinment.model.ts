import mongoose from "mongoose";
import IAppointment from "../interfaces/IAppointment.interface.ts";

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
  },
  time: {
    type: String,
    required: true,
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
  session: {
    type: mongoose.Schema.ObjectId,
    ref: "sessions",
  },
});

export const AppointmentModel = mongoose.model<IAppointment, AppointmentModel>(
  APPOINTMENT_COLLECTION,
  AppointmentSchema
);
