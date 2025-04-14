import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { IConsultation, IConsultationForm } from "../types/consultation.types";
import { consultationsAPI } from "./consultationsAPI";
import { AnyStringArrayObject } from "../../../types/general.types";

export const getAllConsultations = createAsyncThunk<
  IConsultation[] | undefined,
  undefined,
  { state: RootState }
>(
  "consultations/getAllConsulations",
  async () => {
    try {
      const result = await consultationsAPI.getAllEntities();
      return result as IConsultation[];
    } catch (err) {
      console.log(err);
    }
  },
  {
    condition: (arg, { getState }) => {
      if (arg) {
        /* */
      }

      const { consultations } = getState();

      if (
        consultations.ids.length !== 0 &&
        consultations.previousCrudAction !== null
      ) {
        return false;
      }
    },
  }
);

export const addConsultation = createAsyncThunk(
  "consultations/addConsultation",
  async (body: IConsultationForm) => {
    try {
      const result = await consultationsAPI.addEntity(body, true);
      return result;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getConsultationById = createAsyncThunk(
  "consultations/getConsultationById",
  async (id: string) => {
    try {
      const result = await consultationsAPI.getEntityById(id);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addConsultationTechniques = createAsyncThunk(
  "consultations/addConsultationsTechniques",
  async (data: {
    consultation: IConsultation;
    techniques: AnyStringArrayObject;
  }) => {
    try {
      const result = await consultationsAPI.addConsultationTechniques(
        data.consultation,
        data.techniques
      );
      return result;
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateConsultation = createAsyncThunk(
  "consultations/updateConsultation",
  async (data: IConsultation) => {
    try {
      const result = await consultationsAPI.updateEntity(data._id, data);
      return result as IConsultation;
    } catch (err) {
      console.error(err);
    }
  }
);

export const deleteConsultation = createAsyncThunk(
  "consultations/deleteConsultation",
  async (id: string) => {
    try {
      const result = await consultationsAPI.deleteEntity(id);
      return result;
    } catch (err) {
      console.error(err);
    }
  }
);
