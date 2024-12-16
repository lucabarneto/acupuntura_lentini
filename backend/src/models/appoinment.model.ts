import mongoose from "mongoose";

const APPOINTMENT_COLLECTION = "appointments";

const AppointmentSchema = new mongoose.Schema({
  date: String,
  time: String,
  patient_is_notifyed: Boolean,
  expired: Boolean,
  patient_assisted: Boolean,
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: "patients",
  },
  session: {
    type: mongoose.Schema.ObjectId,
    ref: "sessions",
  },
});

AppointmentSchema.pre("find", function () {
  this.populate(["session", "patient"]);
});

export const AppointmentModel = mongoose.model(
  APPOINTMENT_COLLECTION,
  AppointmentSchema
);
