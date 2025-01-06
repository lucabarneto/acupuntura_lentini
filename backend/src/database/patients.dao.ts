import IPatient from "../types/IPatient.interface.ts";
import { PatientModel } from "../models/patient.model.ts";
import { MongoDAO } from "./mongo.dao.ts";

class PatientDAO extends MongoDAO<IPatient, typeof PatientModel> {}

export const patientDAO = new PatientDAO(PatientModel);
