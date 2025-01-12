import { Router } from "express";
import { IChiefComplaint } from "../types/mongo/IChiefComplaint.ts";
import { ChiefComplaintController } from "../controllers/chiefComplaints.controller.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { RequestParams } from "../types/express/RequestParams.ts";

export const chiefComplaintRouter = Router();
const chiefComplaintController = new ChiefComplaintController();

chiefComplaintRouter.param("id", chiefComplaintController.handleId);

chiefComplaintRouter.get("/", chiefComplaintController.getAllChiefComplaints);

chiefComplaintRouter.get(
  "/:id",
  validateRequest({ params: RequestParams }),
  chiefComplaintController.getChiefComplaintById
);

chiefComplaintRouter.post(
  "/",
  validateRequest({ body: IChiefComplaint }),
  chiefComplaintController.createChiefComplaint
);

chiefComplaintRouter.put(
  "/:id",
  validateRequest({ params: RequestParams, body: IChiefComplaint }),
  chiefComplaintController.updateChiefComplaint
);

chiefComplaintRouter.delete(
  "/:id",
  validateRequest({ params: RequestParams }),
  chiefComplaintController.deleteChiefComplaint
);
