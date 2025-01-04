import { sessionDAO } from "../database/sessions.dao.ts";
import ISession from "../interfaces/ISession.interface.ts";
import ID from "../interfaces/ID.interface.ts";

export default class Session {
  getAll = async () => {
    const result = await sessionDAO.getAll();

    if (result.status === "error") throw result.error;

    return result.payload;
  };

  getById = async (id: ID) => {
    const result = await sessionDAO.getById(id);

    if (result.status === "error") throw result.error;

    return result.payload;
  };

  create = async (Session: ISession) => {
    const result = await sessionDAO.create(Session);

    if (result.status === "error") throw result.error;

    return result.payload;
  };

  update = async (id: ID, update: ISession) => {
    const result = await sessionDAO.update(id, update);

    if (result.status === "error") throw result.error;

    return result.payload;
  };

  delete = async (id: ID) => {
    const result = await sessionDAO.delete(id);
    if (result.status === "error") throw result.error;

    return result.payload;
  };
}
