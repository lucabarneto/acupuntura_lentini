export interface Service<T> {
  getAll: () => Promise<T[]>;
  getById: (id: string) => Promise<T>;
  create: (data: T) => Promise<T>;
  update: (id: string, update: T) => Promise<T>;
  delete: (id: string) => Promise<{}>;
}
