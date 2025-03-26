import { IPatient, IPatientForm } from "../types/patient.types";
import { API } from "../../../app/api";

const URL = "http://localhost:8080/api/patients";

class PatientsAPI extends API<IPatient, IPatientForm> {}

export const patientsAPI = new PatientsAPI(URL);
