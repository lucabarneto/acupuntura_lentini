import { API } from "../../app/api";
import { IConsultation, IConsultationDTO } from "./types/consultation.types";

const URL = "http://localhost:8080/api/consultations";

class ConsultationAPI extends API<IConsultation, IConsultationDTO> {}

export const consultationsAPI = new ConsultationAPI(URL);
