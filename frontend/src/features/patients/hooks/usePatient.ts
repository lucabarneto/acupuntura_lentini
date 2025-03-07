/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../app/store";
import * as slice from "../slices/patientsSlice";
import { AdaptableForm } from "../../../types/form.types";
import { useEffect } from "react";

export const usePatient = (id: string = "") => {
  const dispatch = useAppDispatch();
  const allPatients = useSelector(slice.selectAllPatients);
  const patient = useSelector((state: RootState) =>
    slice.selectPatientById(state, id)
  );

  useEffect(() => {
    dispatch(slice.getAllPatients());
  }, [dispatch]);

  const addPatient = (body: AdaptableForm, callback: (arg?: any) => void) =>
    dispatch(slice.addPatient(body)).then(callback);

  const deletePatient = (id: string, callback: (arg?: any) => void) =>
    dispatch(slice.deletePatient(id)).then(callback);

  const sortPatients = (order: "asc" | "desc") =>
    dispatch(slice.sortByName(order)); // Should add argument "term" and dispatch reducers conditionally when splice eventually contains multiple sorting reducers

  return { allPatients, patient, addPatient, deletePatient, sortPatients };
};
