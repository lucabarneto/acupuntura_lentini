import { api } from "../utils/axios";

export abstract class API<
  T extends object,
  F extends object,
  U extends object
> {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  async getAllEntities(): Promise<T[] | undefined> {
    try {
      const res = await api.get(this.url);

      if (res.data.status === "error") throw res.data;

      return res.data.payload as T[];
    } catch (error) {
      console.error(error);
    }
  }

  async getEntityById(id: string): Promise<T | undefined> {
    try {
      const res = await api.get(`${this.url}/${id}`);

      if (res.data.status === "error") throw res.data;

      return res.data.payload as T;
    } catch (error) {
      console.error(error);
    }
  }

  async addEntity(body: F, hasFiles: boolean = false): Promise<T | undefined> {
    try {
      let res;

      if (hasFiles) {
        res = await api.post(this.url, body, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        res = await api.post(this.url, body);
      }

      if (res.data.status === "error") throw res.data;

      return res.data.payload as T;
    } catch (error) {
      console.error(error);
    }
  }

  async updateEntity(id: string, body: U): Promise<T | undefined> {
    try {
      const res = await api.put(`${this.url}/${id}`, body);

      if (res.data.status === "error") throw res.data;

      return res.data.payload as T;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteEntity(id: string): Promise<object | undefined> {
    try {
      const res = await api.delete(`${this.url}/${id}`);

      if (res.data.status === "error") throw res.data;

      return res.data.payload as object;
    } catch (err) {
      console.error(err);
    }
  }
}
