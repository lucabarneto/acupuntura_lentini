import { IAppointment } from "../types/mongo/IAppointment";
import { AppointmentModel } from "../models/appoinment.model";
import { MongoDAO } from "./mongo.dao";

class AppointmentDAO extends MongoDAO<IAppointment> {}

export const appointmentDAO = new AppointmentDAO(AppointmentModel);
