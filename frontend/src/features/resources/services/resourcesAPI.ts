import { IResource, IResourceForm } from "../types/resource.types";
import { API } from "../../../app/api";

const URL = "http://localhost:8080/api/resources";

class ResourcesAPI extends API<IResource, IResourceForm> {}

export const resourcesAPI = new ResourcesAPI(URL);
