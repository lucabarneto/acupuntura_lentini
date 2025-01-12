import { Router } from "express";
import { IReport } from "../types/mongo/IReport.ts";
import { ReportController } from "../controllers/reports.controller.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { RequestParams } from "../types/express/RequestParams.ts";

export const reportRouter = Router();
const reportController = new ReportController();

reportRouter.param("id", reportController.handleId);

reportRouter.get("/", reportController.getAllReports);

reportRouter.get(
  "/:id",
  validateRequest({ params: RequestParams }),
  reportController.getReportById
);

reportRouter.post(
  "/",
  validateRequest({ body: IReport }),
  reportController.createReport
);

reportRouter.put(
  "/:id",
  validateRequest({ params: RequestParams, body: IReport }),
  reportController.updateReport
);

reportRouter.delete(
  "/:id",
  validateRequest({ params: RequestParams }),
  reportController.deleteReport
);
