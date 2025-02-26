import axios from "axios";
import { IPatient } from "../types/IPatient";

const URL = "http://localhost:8080/api/patients";

class PatientsAPI {
  constructor(private url: string) {}

  async fetchAllPatients(): Promise<IPatient[] | undefined> {
    try {
      const res = await axios.get(this.url);

      if (res.data.status === "error") throw res.data;

      return res.data.payload as IPatient[];
    } catch (err) {
      console.error(err);
    }
  }
}

export const patientsAPI = new PatientsAPI(URL);
