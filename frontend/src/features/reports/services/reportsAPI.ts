import { API } from "../../../app/api";
import { IReport, IReportForm } from "../types/report.types";

const URL = "http://localhost:8080/api/reports";

class ReportsAPI extends API<IReport, IReportForm> {}

export const reportsAPI = new ReportsAPI(URL);
