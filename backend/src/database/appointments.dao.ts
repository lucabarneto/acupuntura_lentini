import IAppointment from "../types/mongo/IAppointment.ts";
import { AppointmentModel } from "../models/appoinment.model.ts";
import { MongoDAO } from "./mongo.dao.ts";

class AppointmentDAO extends MongoDAO<IAppointment, typeof AppointmentModel> {}

export const appointmentDAO = new AppointmentDAO(AppointmentModel);
