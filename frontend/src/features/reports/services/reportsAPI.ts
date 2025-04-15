import { API } from "../../../app/api";
import { BASEURL } from "../../../utils/axios";
import { IReport, IReportForm } from "../types/report.types";

const URL = BASEURL + "/api/reports";

class ReportsAPI extends API<IReport, IReportForm, IReport> {}

export const reportsAPI = new ReportsAPI(URL);
