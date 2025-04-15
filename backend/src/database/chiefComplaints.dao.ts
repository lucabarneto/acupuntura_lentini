import { IChiefComplaint } from "../types/mongo/IChiefComplaint.js";
import { ChiefComplaintModel } from "../models/chiefComplaint.model.js";
import { MongoDAO } from "./mongo.dao.js";

class ChiefComplaintDAO extends MongoDAO<IChiefComplaint> {}

export const chiefComplaintDAO = new ChiefComplaintDAO(ChiefComplaintModel);
