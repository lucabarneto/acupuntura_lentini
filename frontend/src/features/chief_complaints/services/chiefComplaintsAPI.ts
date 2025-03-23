import axios from "axios";
import {
  IChiefComplaint,
  IChiefComplaintForm,
} from "../types/chief_complaint.types";
const URL = "http://localhost:8080/api/chiefcomplaints";

class ChiefComplaintsAPI {
  constructor(private url: string) {}

  async getAllChiefComplaints(): Promise<IChiefComplaint[] | undefined> {
    try {
      const res = await axios.get(this.url);

      if (res.data.status === "error") throw res.data;

      return res.data.payload as IChiefComplaint[];
    } catch (err) {
      console.error(err);
    }
  }

  async addChiefComplaint(
    body: IChiefComplaintForm
  ): Promise<IChiefComplaint | undefined> {
    try {
      console.log(body);

      const res = await axios.post(this.url, body);

      return res.data.payload as IChiefComplaint;
    } catch (err) {
      console.error(err);
    }
  }

  // async updatePatient(body: IPatient) {
  //   try {
  //     const res = await axios.put(`${this.url}/${body._id}`, body);

  //     if (res.data.status === "error") throw res.data;

  //     return res.data.payload as IPatient;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  // async deletePatient(id: string): Promise<object | undefined> {
  //   try {
  //     const res = await axios.delete(`${this.url}/${id}`);

  //     if (res.data.status === "error") throw res.data;

  //     return res.data;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
}

export const chiefComplaintsAPI = new ChiefComplaintsAPI(URL);
