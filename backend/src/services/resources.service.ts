import { IResource } from "../types/mongo/IResource";
import { resourceDAO } from "../database/resources.dao";
import { BaseService } from "./base.service";

class ResourceService extends BaseService<IResource> {
  findEqual = (data: IResource, resources: IResource[]): boolean =>
    resources.some(
      (resource) => resource.title.toLowerCase() === data.title.toLowerCase()
    );
}

export const resourceService = new ResourceService(resourceDAO);
