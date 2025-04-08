import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPatient, IPatientForm } from "../types/patient.types";
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
    condition: (arg: undefined, { getState }) => {
      const { patients } = getState();

      if (patients.ids.length !== 0 && patients.previousCrudAction !== null) {
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
  async (data: IPatient) => {
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
