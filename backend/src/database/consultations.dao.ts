import { IConsultation } from "../types/mongo/IConsultation.js";
import { ConsultationModel } from "../models/consultation.model.js";
import { MongoDAO } from "./mongo.dao.js";

class ConsultationDAO extends MongoDAO<IConsultation> {}

export const consultationDAO = new ConsultationDAO(ConsultationModel);
