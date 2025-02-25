import axios from "axios";
import { IPatient } from "./IPatient";

const URL = "http://localhost:8080/api/patients";

class PatientsAPI {
  constructor(private url: string) {}

  async getAllPatients(): Promise<IPatient[] | undefined> {
    try {
      const res = await axios.get(this.url);

      console.log(res.data);

      return res.data as IPatient[];
    } catch (err) {
      console.error(err);
    }
  }
}

export const patientsAPI = new PatientsAPI(URL);
