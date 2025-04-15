import { IResource } from "../types/mongo/IResource.js";
import { resourceDAO } from "../database/resources.dao.js";
import { BaseService } from "./base.service.js";

class ResourceService extends BaseService<IResource> {
  findEqual = (data: IResource, resources: IResource[]): boolean =>
    resources.some(
      (resource) => resource.title.toLowerCase() === data.title.toLowerCase()
    );
}

export const resourceService = new ResourceService(resourceDAO);
