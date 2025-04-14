import { IPatient } from "../types/mongo/IPatient";
import { PatientModel } from "../models/patient.model";
import { MongoDAO } from "./mongo.dao";

class PatientDAO extends MongoDAO<IPatient> {}

export const patientDAO = new PatientDAO(PatientModel);
