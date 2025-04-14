import { IReport } from "../types/mongo/IReport";
import { reportDAO } from "../database/reports.dao";
import { BaseService } from "./base.service";

class Report extends BaseService<IReport> {
  findEqual = (data: IReport, reports: IReport[]): boolean =>
    reports.some(
      (report) =>
        report.chief_complaint.toString() === data.chief_complaint.toString()
    );
}

export const reportService = new Report(reportDAO);
