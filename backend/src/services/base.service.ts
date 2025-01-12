import { DAO } from "../types/general/Dao.interface.ts";
import { ID } from "../types/general/ID.interface.ts";

interface Service<T> {
  getAll: () => Promise<T[]>;
  getById: (id: string) => Promise<T>;
  create: (data: T) => Promise<T>;
  update: (id: string, update: T) => Promise<T>;
  delete: (id: string) => Promise<{}>;
}

export abstract class BaseService<Interface> implements Service<Interface> {
  private dao: DAO<Interface>;

  constructor(dao: DAO<Interface>) {
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
