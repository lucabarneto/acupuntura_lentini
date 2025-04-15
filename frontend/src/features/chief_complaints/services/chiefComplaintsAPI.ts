import {
  IChiefComplaint,
  IChiefComplaintForm,
} from "../types/chief_complaint.types";
import { API } from "../../../app/api";
import { BASEURL } from "../../../utils/axios";
const URL = BASEURL + "/api/chiefcomplaints";

class ChiefComplaintsAPI extends API<
  IChiefComplaint,
  IChiefComplaintForm,
  IChiefComplaintForm
> {}

export const chiefComplaintsAPI = new ChiefComplaintsAPI(URL);
