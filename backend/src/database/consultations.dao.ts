import { IConsultation } from "../types/mongo/IConsultation.ts";
import { ConsultationModel } from "../models/consultation.model.ts";
import { MongoDAO } from "./mongo.dao.ts";

class ConsultationDAO extends MongoDAO<IConsultation> {}

export const consultationDAO = new ConsultationDAO(ConsultationModel);
