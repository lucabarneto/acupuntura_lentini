import { IPatient } from "../types/mongo/IPatient.js";
import { PatientModel } from "../models/patient.model.js";
import { MongoDAO } from "./mongo.dao.js";

class PatientDAO extends MongoDAO<IPatient> {}

export const patientDAO = new PatientDAO(PatientModel);
