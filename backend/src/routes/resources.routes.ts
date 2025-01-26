import { Router } from "express";
import { IResource } from "../types/mongo/IResource.ts";
import { ResourceController } from "../controllers/resources.controller.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { RequestParams } from "../types/express/RequestParams.ts";
import { authenticate } from "../middlewares/authenticate.ts";
import { adminAuthorization } from "../middlewares/adminAuthorization.ts";

const resourceController = new ResourceController();

export const resourceRouter = Router();

resourceRouter.param("id", resourceController.handleId);

resourceRouter.get(
  "/",
  authenticate("jwt", { session: false }),
  resourceController.getAllResources
);

resourceRouter.get(
  "/:id",
  authenticate("jwt", { session: false }),
  validateRequest({ params: RequestParams }),
  resourceController.getResourceById
);

resourceRouter.post(
  "/",
  authenticate("jwt", { session: false }),
  adminAuthorization,
  validateRequest({ body: IResource }),
  resourceController.createResource
);

resourceRouter.put(
  "/:id",
  authenticate("jwt", { session: false }),
  adminAuthorization,
  validateRequest({ params: RequestParams, body: IResource }),
  resourceController.updateResource
);

resourceRouter.delete(
  "/:id",
  authenticate("jwt", { session: false }),
  adminAuthorization,
  validateRequest({ params: RequestParams }),
  resourceController.deleteResource
);
