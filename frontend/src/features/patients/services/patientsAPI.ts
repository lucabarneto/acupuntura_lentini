import { IPatient, IPatientForm } from "../types/patient.types";
import { API } from "../../../app/api";
import { BASEURL } from "../../../utils/axios";

const URL = BASEURL + "/api/patients";

class PatientsAPI extends API<IPatient, IPatientForm> {}

export const patientsAPI = new PatientsAPI(URL);
