import { Service } from "../types/Service.interface.ts";
import { DAO } from "../types/DAO.interface.ts";
import ID from "../types/ID.interface.ts";

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

  create = async (data: Interface): Promise<Interface> => {
    await this.isAlreadyInDatabase(data);

    const result = await this.dao.create(data);

    if (result.status === "error") throw result.error;

    return result.payload;
  };

  update = async (id: ID, update: Interface): Promise<Interface> => {
    await this.isAlreadyInDatabase(update);

    const result = await this.dao.update(id, update);

    if (result.status === "error") throw result.error;

    return result.payload;
  };

  delete = async (id: ID): Promise<{}> => {
    const result = await this.dao.delete(id);
    if (result.status === "error") throw result.error;

    return result.payload;
  };

  private isAlreadyInDatabase = async (data: Interface): Promise<void> => {
    const documents = await this.getAll();

    if (documents.length !== 0) {
      const result = this.findEqual(data, documents);

      if (result) throw new Error("Already in database");
    }
  };

  abstract findEqual: (suspect: Interface, dbDocuments: Interface[]) => boolean;
}
