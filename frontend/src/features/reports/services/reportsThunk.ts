import { createAsyncThunk } from "@reduxjs/toolkit";
import { IReport, IReportForm } from "../types/report.types";
import { RootState } from "../../../app/store";
import { reportsAPI } from "./reportsAPI";

export const getAllReports = createAsyncThunk<
  IReport[] | undefined,
  undefined,
  { state: RootState }
>(
  "reports/getAllReports",
  async () => {
    try {
      const result = await reportsAPI.getAllEntities();
      return result as IReport[];
    } catch (err) {
      console.log(err);
    }
  },
  {
    condition: (arg: undefined, { getState }) => {
      const { reports } = getState();

      if (reports.ids.length !== 0 && reports.previousCrudAction !== null) {
        return false;
      }
    },
  }
);

export const getReportById = createAsyncThunk(
  "reports/getReportById",
  async (id: string) => {
    try {
      const result = await reportsAPI.getEntityById(id);
      return result as IReport;
    } catch (error) {
      console.error(error);
    }
  }
);

export const addReport = createAsyncThunk(
  "reports/addReport",
  async (body: IReportForm) => {
    try {
      const result = await reportsAPI.addEntity(body);
      return result as IReport;
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateReport = createAsyncThunk(
  "reports/updateReport",
  async (data: IReport) => {
    try {
      const result = await reportsAPI.updateEntity(data._id, data);
      return result as IReport;
    } catch (err) {
      console.error(err);
    }
  }
);

export const deleteReport = createAsyncThunk(
  "reports/deleteReport",
  async (id: string) => {
    try {
      const result = await reportsAPI.deleteEntity(id);
      return result;
    } catch (err) {
      console.error(err);
    }
  }
);
