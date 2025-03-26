import axios from "axios";

export abstract class API <T extends object, F extends object> {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  async getAllEntities(): Promise<T[] | undefined> {
    try {
      const res = await axios.get(this.url);

      if (res.data.status === "error") throw res.data;

      return res.data.payload as T[];
    } catch (error) {
      console.error(error);
    }
  }

  async addEntity(body: F): Promise<T | undefined> {
    try {
      const res = await axios.post(this.url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })

      if (res.data.status === "error") throw res.data;

      return res.data.payload as T
    } catch (error) {
      console.error(error)
    }
  }

  async updateEntity(id: string, body: T) {
    try {
      const res = await axios.put(`${this.url}/${id}`, body);

      if (res.data.status === "error") throw res.data;

      return res.data.payload as T
    } catch (error) {
      console.error(error)
    }
  }

  async deleteEntity(id: string): Promise<object | undefined> {
    try {
      const res = await axios.delete(`${this.url}/${id}`);

      if (res.data.status === "error") throw res.data;

      return res.data.payload as object
    } catch (err) {
      console.error(err);
    }
  }
}