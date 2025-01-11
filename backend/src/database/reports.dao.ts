import { IReport } from "../types/mongo/IReport.ts";
import { ReportModel } from "../models/report.model.ts";
import { MongoDAO } from "./mongo.dao.ts";

class ReportDAO extends MongoDAO<IReport> {}

export const reportDAO = new ReportDAO(ReportModel);
