import axios from "axios";
import { IPatient, IPatientForm } from "../types/IPatient";

const URL = "http://localhost:8080/api/patients";

class PatientsAPI {
  constructor(private url: string) {}

  async getAllPatients(): Promise<IPatient[] | undefined> {
    try {
      const res = await axios.get(this.url);

      if (res.data.status === "error") throw res.data;

      return res.data.payload as IPatient[];
    } catch (err) {
      console.error(err);
    }
  }

  async addPatient(body: IPatientForm): Promise<IPatient | undefined> {
    try {
      // const body = PatientDTO.adapt(formdata);
      console.log(body);

      const res = await axios.post(this.url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data.payload as IPatient;
    } catch (err) {
      console.error(err);
    }
  }

  async deletePatient(id: string): Promise<object | undefined> {
    try {
      const res = await axios.delete(`${this.url}/${id}`);

      if (res.data.status === "error") throw res.data;

      return res.data;
    } catch (err) {
      console.error(err);
    }
  }
}

export const patientsAPI = new PatientsAPI(URL);
