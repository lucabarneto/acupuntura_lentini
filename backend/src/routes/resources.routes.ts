import { Router } from "express";
import ResourceController from "../controllers/resources.controller.ts";

import IResource from "../interfaces/IResource.interface.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import RequestParams from "../interfaces/RequestParams.interface.ts";

const resourceRouter = Router();
const resourceController = new ResourceController();

resourceRouter.param("id", resourceController.handleId);

resourceRouter.get("/", resourceController.getAllResources);

resourceRouter.get(
  "/:id",
  validateRequest({ params: RequestParams }),
  resourceController.getResourceById
);

resourceRouter.post(
  "/",
  validateRequest({ body: IResource }),
  resourceController.createResource
);

resourceRouter.put(
  "/:id",
  validateRequest({ params: RequestParams, body: IResource }),
  resourceController.updateResource
);

resourceRouter.delete(
  "/:id",
  validateRequest({ params: RequestParams }),
  resourceController.deleteResource
);

export default resourceRouter;
