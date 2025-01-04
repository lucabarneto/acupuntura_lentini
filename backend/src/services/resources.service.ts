import IResource from "../interfaces/IResource.interface.ts";
import { resourceDAO } from "../database/resources.dao.ts";
import ID from "../interfaces/ID.interface.ts";

export default class Resource {
  getAll = async () => {
    const result = await resourceDAO.getAll();

    if (result.status === "error") throw result.error;

    return result.payload;
  };

  getById = async (id: ID) => {
    const result = await resourceDAO.getById(id);

    if (result.status === "error") throw result.error;

    return result.payload;
  };

  create = async (resource: IResource) => {
    const result = await resourceDAO.create(resource);

    if (result.status === "error") throw result.error;

    return result.payload;
  };

  update = async (id: ID, update: IResource) => {
    const result = await resourceDAO.update(id, update);

    if (result.status === "error") throw result.error;

    return result.payload;
  };

  delete = async (id: ID) => {
    const result = await resourceDAO.delete(id);
    if (result.status === "error") throw result.error;

    return result.payload;
  };
}
