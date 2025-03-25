import axios from "axios";
import { IResource } from "../types/resource.types";

const URL = "http://localhost:8080/api/resources";

class ResourcesAPI {
  constructor(private url: string) {}

  async getAllResources(): Promise<IResource[] | undefined> {
    try {
      const res = await axios.get(this.url);

      if (res.data.status === "error") throw res.data;

      return res.data.payload as IResource[];
    } catch (err) {
      console.error(err);
    }
  }
}

export const resourcesAPI = new ResourcesAPI(URL);
