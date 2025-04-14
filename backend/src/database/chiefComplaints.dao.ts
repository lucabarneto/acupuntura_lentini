import { IChiefComplaint } from "../types/mongo/IChiefComplaint";
import { ChiefComplaintModel } from "../models/chiefComplaint.model";
import { MongoDAO } from "./mongo.dao";

class ChiefComplaintDAO extends MongoDAO<IChiefComplaint> {}

export const chiefComplaintDAO = new ChiefComplaintDAO(ChiefComplaintModel);
