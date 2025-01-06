import IChiefComplaint from "../types/IChiefComplaint.interface.ts";
import { ChiefComplaintModel } from "../models/chiefComplaint.model.ts";
import { MongoDAO } from "./mongo.dao.ts";

class ChiefComplaintDAO extends MongoDAO<
  IChiefComplaint,
  typeof ChiefComplaintModel
> {}

export const chiefComplaintDAO = new ChiefComplaintDAO(ChiefComplaintModel);
