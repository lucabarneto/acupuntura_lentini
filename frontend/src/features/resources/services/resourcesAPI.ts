import { IResource, IResourceForm } from "../types/resource.types";
import { API } from "../../../app/api";
import { BASEURL } from "../../../utils/axios";

const URL = BASEURL + "/api/resources";

class ResourcesAPI extends API<IResource, IResourceForm> {}

export const resourcesAPI = new ResourcesAPI(URL);
