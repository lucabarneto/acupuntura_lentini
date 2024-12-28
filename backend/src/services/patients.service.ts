import PatientDAO from "../database/patients.dao.ts";
import IPatient from "../interfaces/IPatient.interface.ts";
import ID from "../interfaces/ID.interface.ts";

const patientDAO = new PatientDAO();

export default class Patient {
  getAll = async () => {
    const result = await patientDAO.getAll();

    if (result.status === "error") throw result.error;

    return result.payload;
  };

  getById = async (id: ID) => {
    const result = await patientDAO.getById(id);

    if (result.status === "error") throw result.error;

    return result.payload;
  };

  create = async (patient: IPatient) => {
    const result = await patientDAO.create(patient);

    if (result.status === "error") throw result.error;

    return result.payload;
  };

  update = async (id: ID, update: IPatient) => {
    const result = await patientDAO.update(id, update);

    if (result.status === "error") throw result.error;

    return result.payload;
  };

  delete = async (id: ID) => {
    const result = await patientDAO.delete(id);
    if (result.status === "error") throw result.error;

    return result.payload;
  };

  getByIdAndAddChiefComplaint = async (
    patient_id: ID,
    chief_complaint_id: ID
  ) => {
    try {
      const patient = await patientDAO.getById(patient_id);

      if (patient.status === "error") throw patient.error;

      const result = await this.addChiefComplaint(
        { patient_id, chief_complaint_id },
        patient.payload
      );

      return result;
    } catch (err) {
      throw err;
    }
  };

  private addChiefComplaint = async (
    ids: { patient_id: ID; chief_complaint_id: ID },
    patient: IPatient
  ) => {
    patient.chief_complaints.push({
      chief_complaint: ids.chief_complaint_id,
    });

    const result = await patientDAO.update(ids.patient_id, patient);

    if (result.status === "error") throw result.error;

    return result.payload;
  };
}
