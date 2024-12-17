interface SuccessReturnValue {
  status: "success";
  payload: unknown;
}
interface ErrorReturnValue {
  status: "error";
  error: Error;
}

type DAOReturnValue = SuccessReturnValue | ErrorReturnValue;

export interface DAO {
  getAll: () => Promise<DAOReturnValue>;
  getById: (id: string) => Promise<DAOReturnValue>;
  create: (data: unknown) => Promise<DAOReturnValue>;
  update: (id: string, update: unknown) => Promise<DAOReturnValue>;
  delete: (id: string) => Promise<DAOReturnValue>;
}
