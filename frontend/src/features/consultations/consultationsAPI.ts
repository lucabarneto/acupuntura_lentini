import { API } from "../../app/api";
import { IConsultation, IConsultationForm } from "./types/consultation.types";

const URL = "http://localhost:8080/api/consultations";

class ConsultationAPI extends API<IConsultation, IConsultationForm> {}

export const consultationsAPI = new ConsultationAPI(URL);
