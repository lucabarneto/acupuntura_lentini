import { IReport } from "../types/mongo/IReport";
import { ReportModel } from "../models/report.model";
import { MongoDAO } from "./mongo.dao";

class ReportDAO extends MongoDAO<IReport> {}

export const reportDAO = new ReportDAO(ReportModel);
