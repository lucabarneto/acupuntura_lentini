import { IResource } from "../types/mongo/IResource.js";
import { ResourceModel } from "../models/resource.model.js";
import { MongoDAO } from "./mongo.dao.js";

class ResourceDAO extends MongoDAO<IResource> {}

export const resourceDAO = new ResourceDAO(ResourceModel);
