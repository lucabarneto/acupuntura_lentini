import { IResource } from "../types/mongo/IResource.ts";
import { ResourceModel } from "../models/resource.model.ts";
import { MongoDAO } from "./mongo.dao.ts";

class ResourceDAO extends MongoDAO<IResource> {}

export const resourceDAO = new ResourceDAO(ResourceModel);
