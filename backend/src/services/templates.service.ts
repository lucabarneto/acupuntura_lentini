import ITemplate from "../interfaces/ITemplate.interface.ts";
import { templateDAO } from "../database/templates.dao.ts";
import ID from "../interfaces/ID.interface.ts";

export default class Template {
  getAll = async () => {
    const result = await templateDAO.getAll();

    if (result.status === "error") throw result.error;

    return result.payload;
  };

  getById = async (id: ID) => {
    const result = await templateDAO.getById(id);

    if (result.status === "error") throw result.error;

    return result.payload;
  };

  create = async (template: ITemplate) => {
    const result = await templateDAO.create(template);

    if (result.status === "error") throw result.error;

    return result.payload;
  };

  update = async (id: ID, update: ITemplate) => {
    const result = await templateDAO.update(id, update);

    if (result.status === "error") throw result.error;

    return result.payload;
  };

  delete = async (id: ID) => {
    const result = await templateDAO.delete(id);
    if (result.status === "error") throw result.error;

    return result.payload;
  };
}
