/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSelector } from "react-redux";
import * as slice from "../services/reportsSlice.ts";
import * as thunk from "../services/reportsThunk.ts";
import { useAppDispatch } from "../../../app/store.ts";
import { RootState } from "../../../app/store.ts";
import { useEffect } from "react";
import { IReport, IReportForm } from "../types/report.types.ts";

type DispatchCallback = (arg: any) => void;

export const useReport = (id: string = "") => {
  const dispatch = useAppDispatch();
  const allReports = useSelector(slice.selectAll);
  const report = useSelector((state: RootState) => slice.selectById(state, id));

  useEffect(() => {
    dispatch(thunk.getAllReports());
  }, [dispatch]);

  const createURLName = (report: IReport) =>
    `Reporte_${report.chief_complaint.title.split(" ").join("_")}`;

  const getReportById = (id: string) =>
    dispatch(thunk.getReportById(id))
      .unwrap()
      .then((res) => res);

  const addReport = (body: IReportForm, callback?: DispatchCallback) =>
    dispatch(thunk.addReport(body)).unwrap().then(callback);

  const updateReport = (body: IReport, callback?: DispatchCallback) =>
    dispatch(thunk.updateReport(body)).unwrap().then(callback);

  const deleteReport = (id: string, callback?: DispatchCallback) =>
    dispatch(thunk.deleteReport(id)).then(callback);

  return {
    crudMethods: {
      getReportById,
      addReport,
      updateReport,
      deleteReport,
    },
    utilityMethods: {
      createURLName,
    },
    entityData: {
      allReports,
      report,
    },
  };
};
