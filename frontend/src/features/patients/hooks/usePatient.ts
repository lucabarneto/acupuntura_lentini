/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../app/store";
import * as slice from "../slices/patientsSlice";
import { useEffect } from "react";
import { IPatient, IPatientForm } from "../types/patient.types";
import { SelectOptions } from "../../../components/ui/Input/input.types";

type DispatchCallback = (arg: any) => void;

export const usePatient = (id: string = "") => {
  const dispatch = useAppDispatch();
  const allPatients = useSelector(slice.selectAll);
  const patient = useSelector((state: RootState) =>
    slice.selectById(state, id)
  );

  useEffect(() => {
    dispatch(slice.getAllPatients());
  }, [dispatch]);

  const patientSelectOptions: SelectOptions[] = allPatients.map((patient) => {
    return {
      label: `${patient.first_name} ${patient.last_name}`,
      value: patient._id,
    };
  });

  const addPatient = (body: IPatientForm, callback?: DispatchCallback) =>
    dispatch(slice.addPatient(body)).unwrap().then(callback);

  const updatePatient = (body: IPatient, callback?: DispatchCallback) =>
    dispatch(slice.updatePatient(body)).unwrap().then(callback);

  const deletePatient = (id: string, callback?: DispatchCallback) =>
    dispatch(slice.deletePatient(id)).then(callback);

  const sortPatients = (order: "asc" | "desc") =>
    dispatch(slice.sortByName(order)); // Should add argument "term" and dispatch reducers conditionally when splice eventually contains multiple sorting reducers

  const createURLName = (patient: IPatient) =>
    `${patient.first_name.toLowerCase()}_${patient.last_name.toLowerCase()}`;

  return {
    allPatients,
    patient,
    patientSelectOptions,
    createURLName,
    addPatient,
    updatePatient,
    deletePatient,
    sortPatients,
  };
};
