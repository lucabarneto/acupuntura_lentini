import axios from "axios";
import { API } from "../../../app/api";
import { AnyStringArrayObject } from "../../../types/general.types";
import { ConsultationTechniquesDTO } from "./consultationTechniquesDTO";
import { IConsultation, IConsultationForm } from "../types/consultation.types";

const URL = "http://localhost:8080/api/consultations";

class ConsultationAPI extends API<IConsultation, IConsultationForm> {
  async addConsultationTechniques(
    consultation: IConsultation,
    techniques: AnyStringArrayObject
  ): Promise<IConsultation | undefined> {
    try {
      console.log(consultation);
      const adaptedTechniques = ConsultationTechniquesDTO.adapt(techniques);
      const update = { ...consultation, resources: adaptedTechniques };
      const res = await axios.put(`${URL}/${consultation._id}`, update);

      if (res.data.status === "error") throw res.data;
      return res.data.payload as IConsultation;
    } catch (err) {
      console.error(err);
    }
  }
}

export const consultationsAPI = new ConsultationAPI(URL);
