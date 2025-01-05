import { Service } from "../interfaces/Service.interface.ts";
import { DAO } from "../interfaces/DAO.interface.ts";
import ID from "../interfaces/ID.interface.ts";

export abstract class BaseService<Interface, Dao extends DAO<Interface>>
  implements Service<Interface>
{
  private dao: Dao;

  constructor(dao: Dao) {
    this.dao = dao;
  }

  getAll = async (): Promise<Interface[]> => {
    const result = await this.dao.getAll();

    if (result.status === "error") throw result.error;

    return result.payload;
  };

  getById = async (id: ID): Promise<Interface> => {
    const result = await this.dao.getById(id);

    if (result.status === "error") throw result.error;

    return result.payload;
  };

  create = async (appointment: Interface): Promise<Interface> => {
    const result = await this.dao.create(appointment);

    if (result.status === "error") throw result.error;

    return result.payload;
  };

  update = async (id: ID, update: Interface): Promise<Interface> => {
    const result = await this.dao.update(id, update);

    if (result.status === "error") throw result.error;

    return result.payload;
  };

  delete = async (id: ID): Promise<{}> => {
    const result = await this.dao.delete(id);
    if (result.status === "error") throw result.error;

    return result.payload;
  };
}
