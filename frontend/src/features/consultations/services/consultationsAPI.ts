import { API } from "../../../app/api";
import { AnyStringArrayObject } from "../../../types/general.types";
import { ConsultationTechniquesDTO } from "./consultationTechniquesDTO";
import {
  IConsultation,
  IConsultationForm,
  IConsultationUpdate,
} from "../types/consultation.types";
import { api, BASEURL } from "../../../utils/axios";

const URL = BASEURL + "/api/consultations";

class ConsultationAPI extends API<
  IConsultation,
  IConsultationForm,
  IConsultation
> {
  async addConsultationTechniques(
    consultation: IConsultation,
    techniques: AnyStringArrayObject
  ): Promise<IConsultation | undefined> {
    try {
      const adaptedTechniques = ConsultationTechniquesDTO.adapt(techniques);
      const update: IConsultationUpdate = {
        ...consultation,
        resources: adaptedTechniques,
      };
      const res = await api.put(`${URL}/${consultation._id}`, update);

      if (res.data.status === "error") throw res.data;
      return res.data.payload as IConsultation;
    } catch (err) {
      console.error(err);
    }
  }
}

export const consultationsAPI = new ConsultationAPI(URL);
