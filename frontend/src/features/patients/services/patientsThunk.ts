import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPatient, IPatientForm, IPatientUpdate } from "../types/patient.types";
import { patientsAPI } from "./patientsAPI";
import { RootState } from "../../../app/store";

export const getAllPatients = createAsyncThunk<
  IPatient[] | undefined,
  undefined,
  { state: RootState }
>(
  "patients/getAllPatients",
  async () => {
    try {
      const result = await patientsAPI.getAllEntities();
      return result as IPatient[];
    } catch (err) {
      console.log(err);
    }
  },
  {
    condition: (arg, { getState }) => {
      if (arg) {
        /* */
      }
      const { patients, chief_complaints } = getState();

      if (
        patients.ids.length !== 0 &&
        chief_complaints.previousCrudAction !== "post" &&
        chief_complaints.previousCrudAction !== "delete" &&
        patients.previousCrudAction !== null
      ) {
        return false;
      }
    },
  }
);

export const getPatientById = createAsyncThunk(
  "patients/getPatientById",
  async (id: string) => {
    try {
      const result = await patientsAPI.getEntityById(id);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addPatient = createAsyncThunk(
  "patients/addPatient",
  async (body: IPatientForm) => {
    try {
      const result = await patientsAPI.addEntity(body, true);
      return result as IPatient;
    } catch (err) {
      console.log(err);
    }
  }
);

export const updatePatient = createAsyncThunk(
  "patients/updatePatient",
  async (data: IPatientUpdate) => {
    try {
      const result = await patientsAPI.updateEntity(data._id, data);
      return result as IPatient;
    } catch (err) {
      console.error(err);
    }
  }
);

export const deletePatient = createAsyncThunk(
  "patients/deletePatient",
  async (id: string) => {
    try {
      const result = await patientsAPI.deleteEntity(id);
      return result;
    } catch (err) {
      console.error(err);
    }
  }
);
