import { SortQueries } from "./SortQueries.ts";

export interface SuccessReturnValue<T> {
  status: "success";
  payload: T;
}
export interface ErrorReturnValue {
  status: "error";
  error: unknown;
}

export type DAOReturnValue<T> = SuccessReturnValue<T> | ErrorReturnValue;

export interface DAO<T> {
  getAll: (sort: undefined | SortQueries) => Promise<DAOReturnValue<T[]>>;
  getById: (id: string) => Promise<DAOReturnValue<T>>;
  create: (data: T) => Promise<DAOReturnValue<T>>;
  update: (id: string, update: T) => Promise<DAOReturnValue<T>>;
  delete: (id: string) => Promise<DAOReturnValue<{}>>;
}
