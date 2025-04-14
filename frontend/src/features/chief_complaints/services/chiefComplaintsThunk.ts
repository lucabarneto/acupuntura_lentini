import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  IChiefComplaint,
  IChiefComplaintForm,
} from "../types/chief_complaint.types";
import { RootState } from "../../../app/store";
import { chiefComplaintsAPI } from "./chiefComplaintsAPI";

export const getAllChiefComplaints = createAsyncThunk<
  IChiefComplaint[] | undefined,
  undefined,
  { state: RootState }
>(
  "chief_complaints/getAllChiefComplaints",
  async () => {
    try {
      const result = await chiefComplaintsAPI.getAllEntities();
      return result as IChiefComplaint[];
    } catch (err) {
      console.log(err);
    }
  },
  {
    condition: (arg, { getState }) => {
      if (arg) {
        /* */
      }
      const { chief_complaints, consultations } = getState();

      if (
        chief_complaints.ids.length !== 0 &&
        consultations.previousCrudAction !== "post" &&
        consultations.previousCrudAction !== "delete" &&
        chief_complaints.previousCrudAction !== null
      ) {
        return false;
      }
    },
  }
);

export const getChiefComplaintById = createAsyncThunk(
  "chief_complaints/getChiefComplaintById",
  async (id: string) => {
    try {
      const result = await chiefComplaintsAPI.getEntityById(id);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addChiefComplaint = createAsyncThunk(
  "chief_complaints/addChiefComplaint",
  async (body: IChiefComplaintForm) => {
    try {
      const result = await chiefComplaintsAPI.addEntity(body);
      return result;
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateChiefComplaint = createAsyncThunk(
  "chief_complaints/updateChiefComplaint",
  async (data: IChiefComplaint) => {
    try {
      const result = await chiefComplaintsAPI.updateEntity(data._id, data);
      return result as IChiefComplaint;
    } catch (err) {
      console.error(err);
    }
  }
);

export const deleteChiefComplaint = createAsyncThunk(
  "chief_complaints/deleteChiefComplaint",
  async (id: string) => {
    try {
      const result = await chiefComplaintsAPI.deleteEntity(id);
      return result;
    } catch (err) {
      console.error(err);
    }
  }
);
