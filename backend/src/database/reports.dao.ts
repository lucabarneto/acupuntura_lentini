import { IReport } from "../types/mongo/IReport.js";
import { ReportModel } from "../models/report.model.js";
import { MongoDAO } from "./mongo.dao.js";

class ReportDAO extends MongoDAO<IReport> {}

export const reportDAO = new ReportDAO(ReportModel);
