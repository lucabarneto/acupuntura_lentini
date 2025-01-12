import { IReport } from "../types/mongo/IReport.ts";
import { reportDAO } from "../database/reports.dao.ts";
import { BaseService } from "./base.service.ts";

class Report extends BaseService<IReport> {
  findEqual = (data: IReport, reports: IReport[]): boolean =>
    reports.some(
      (report) =>
        report.chief_complaint.toString() === data.chief_complaint.toString()
    );
}

export const reportService = new Report(reportDAO);
