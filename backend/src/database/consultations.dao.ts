import { IConsultation } from "../types/mongo/IConsultation";
import { ConsultationModel } from "../models/consultation.model";
import { MongoDAO } from "./mongo.dao";

class ConsultationDAO extends MongoDAO<IConsultation> {}

export const consultationDAO = new ConsultationDAO(ConsultationModel);
