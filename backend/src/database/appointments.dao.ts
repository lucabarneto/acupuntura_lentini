import { IAppointment } from "../types/mongo/IAppointment.js";
import { AppointmentModel } from "../models/appoinment.model.js";
import { MongoDAO } from "./mongo.dao.js";

class AppointmentDAO extends MongoDAO<IAppointment> {}

export const appointmentDAO = new AppointmentDAO(AppointmentModel);
