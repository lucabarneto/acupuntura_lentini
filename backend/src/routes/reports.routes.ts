import { Router } from "express";
import { IReport } from "../types/mongo/IReport.js";
import { ReportController } from "../controllers/reports.controller.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { RequestQueries } from "../types/express/RequestQueries.js";
import { RequestParams } from "../types/express/RequestParams.js";
import { authenticate } from "../middlewares/authenticate.js";

const reportController = new ReportController();

export const reportRouter = Router();

reportRouter.param("id", reportController.handleId);

reportRouter.get(
  "/",
  authenticate("jwt", { session: false }),
  validateRequest({ query: RequestQueries }),
  reportController.getAllReports
);

reportRouter.get(
  "/:id",
  authenticate("jwt", { session: false }),
  validateRequest({ params: RequestParams }),
  reportController.getReportById
);

reportRouter.post(
  "/",
  authenticate("jwt", { session: false }),
  validateRequest({ body: IReport }),
  reportController.createReport
);

reportRouter.put(
  "/:id",
  authenticate("jwt", { session: false }),
  validateRequest({ params: RequestParams, body: IReport }),
  reportController.updateReport
);

reportRouter.delete(
  "/:id",
  authenticate("jwt", { session: false }),
  validateRequest({ params: RequestParams }),
  reportController.deleteReport
);
