import {
  IChiefComplaint,
  IChiefComplaintForm,
} from "../types/chief_complaint.types";
import { API } from "../../../app/api";
const URL = "http://localhost:8080/api/chiefcomplaints";

class ChiefComplaintsAPI extends API<IChiefComplaint, IChiefComplaintForm> {}

export const chiefComplaintsAPI = new ChiefComplaintsAPI(URL);
