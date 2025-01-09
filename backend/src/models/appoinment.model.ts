import mongoose from "mongoose";
import { IAppointment } from "../types/mongo/IAppointment.ts";
import { PatientModel } from "./patient.model.ts";

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
});

/* schema middlewares */

AppointmentSchema.pre("deleteOne", async function () {
  const appointment = (await this.model.findOne(
    this.getQuery()
  )) as IAppointment;

  await PatientModel.updateOne(
    { _id: appointment.patient },
    { $pull: { appointments: { appointment: appointment._id!.toString() } } }
  );
});

export const AppointmentModel = mongoose.model<IAppointment, AppointmentModel>(
  APPOINTMENT_COLLECTION,
  AppointmentSchema
);
