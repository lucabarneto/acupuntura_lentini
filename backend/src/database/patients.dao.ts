import { IPatient } from "../types/mongo/IPatient.ts";
import { PatientModel } from "../models/patient.model.ts";
import { MongoDAO } from "./mongo.dao.ts";

class PatientDAO extends MongoDAO<IPatient> {}

export const patientDAO = new PatientDAO(PatientModel);
