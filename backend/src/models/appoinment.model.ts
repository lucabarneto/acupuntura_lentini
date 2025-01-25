import mongoose from "mongoose";
import { IAppointment } from "../types/mongo/IAppointment.ts";
import { ModelMiddlewares } from "./modelMiddlewares.ts";
import { patientMiddlewares } from "./patient.model.ts";
import { MIN_DATE } from "../constants.ts";

type AppointmentModel = mongoose.Model<IAppointment>;

const APPOINTMENT_COLLECTION = "appointments";

const AppointmentSchema = new mongoose.Schema<IAppointment, AppointmentModel>({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  date: {
    type: Number,
    required: true,
    min: MIN_DATE,
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
    { ref_id: appointment._id!, ref_key: "appointments", isInsideArray: true },
    appointment.patient.toString()
  );

  const patient = await patientMiddlewares.checkForNonExistingDocument(
    appointment.patient.toString()
  );

  await patientMiddlewares.setNextAppointment(
    patient.appointments,
    appointment.patient.toString()
  );
});

AppointmentSchema.pre("save", async function () {
  await patientMiddlewares.checkForNonExistingDocument(this.patient.toString());

  await patientMiddlewares.addReferenceToDocument(
    {
      ref_id: this._id,
      ref_key: "appointments",
      isInsideArray: true,
      aditional_value: this.date,
    },
    this.patient.toString()
  );
});

AppointmentSchema.post("save", async function () {
  const patient = await patientMiddlewares.checkForNonExistingDocument(
    this.patient.toString()
  );

  await patientMiddlewares.setNextAppointment(
    patient.appointments,
    this.patient.toString()
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
