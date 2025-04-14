import { Router } from "express";
import { IResource } from "../types/mongo/IResource";
import { ResourceController } from "../controllers/resources.controller";
import { validateRequest } from "../middlewares/validateRequest";
import { RequestParams } from "../types/express/RequestParams";
import { authenticate } from "../middlewares/authenticate";
import { adminCredentials } from "../middlewares/adminCredentials";

const resourceController = new ResourceController();

export const resourceRouter = Router();

resourceRouter.param("id", resourceController.handleId);

resourceRouter.get(
  "/",
  // authenticate("jwt", { session: false }),
  resourceController.getAllResources
);

resourceRouter.get(
  "/:id",
  // authenticate("jwt", { session: false }),
  validateRequest({ params: RequestParams }),
  resourceController.getResourceById
);

resourceRouter.post(
  "/",
  authenticate("jwt", { session: false }),
  adminCredentials,
  validateRequest({ body: IResource }),
  resourceController.createResource
);

resourceRouter.put(
  "/:id",
  authenticate("jwt", { session: false }),
  adminCredentials,
  validateRequest({ params: RequestParams, body: IResource }),
  resourceController.updateResource
);

resourceRouter.delete(
  "/:id",
  authenticate("jwt", { session: false }),
  adminCredentials,
  validateRequest({ params: RequestParams }),
  resourceController.deleteResource
);
