import { Router } from "express";
import { IChiefComplaint } from "../types/mongo/IChiefComplaint.ts";
import { ChiefComplaintController } from "../controllers/chiefComplaints.controller.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { RequestParams } from "../types/express/RequestParams.ts";
// import { authenticate } from "../middlewares/authenticate.ts";

const chiefComplaintController = new ChiefComplaintController();

export const chiefComplaintRouter = Router();

chiefComplaintRouter.param("id", chiefComplaintController.handleId);

chiefComplaintRouter.get(
  "/",
  // authenticate("jwt", { session: false }),
  chiefComplaintController.getAllChiefComplaints
);

chiefComplaintRouter.get(
  "/:id",
  // authenticate("jwt", { session: false }),
  validateRequest({ params: RequestParams }),
  chiefComplaintController.getChiefComplaintById
);

chiefComplaintRouter.post(
  "/",
  // authenticate("jwt", { session: false }),
  validateRequest({ body: IChiefComplaint }),
  chiefComplaintController.createChiefComplaint
);

chiefComplaintRouter.put(
  "/:id",
  // authenticate("jwt", { session: false }),
  validateRequest({ params: RequestParams, body: IChiefComplaint }),
  chiefComplaintController.updateChiefComplaint
);

chiefComplaintRouter.delete(
  "/:id",
  // authenticate("jwt", { session: false }),
  validateRequest({ params: RequestParams }),
  chiefComplaintController.deleteChiefComplaint
);
