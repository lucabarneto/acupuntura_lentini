/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../app/store";
import * as slice from "../services/chiefComplaintsSlice";
import { useEffect } from "react";
import {
  IChiefComplaintForm,
  IChiefComplaint,
} from "../types/chief_complaint.types";
import { SelectOptions } from "../../../components/ui/Input/input.types";

type DispatchCallback = (arg: any) => void;

export const useChiefComplaint = (id: string = "") => {
  const dispatch = useAppDispatch();
  const allChiefComplaints = useSelector(slice.selectAll);
  const chiefComplaint = useSelector((state: RootState) =>
    slice.selectById(state, id)
  );

  useEffect(() => {
    dispatch(slice.getAllChiefComplaints());
  }, [dispatch]);

  const getChiefComplaintSelectOptions = (
    patient?: string
  ): SelectOptions[] => {
    let selectOptions;

    if (patient) {
      const filteredOptions = allChiefComplaints.filter(
        (chiefComplaint) => chiefComplaint.patient === patient
      );
      selectOptions = filteredOptions.map(mapSelectOptions);
    } else {
      selectOptions = allChiefComplaints.map(mapSelectOptions);
    }

    return selectOptions;
  };

  const mapSelectOptions = (chiefComplaint: IChiefComplaint) => {
    return { label: chiefComplaint.title, value: chiefComplaint._id };
  };

  const addChiefComplaint = (
    body: IChiefComplaintForm,
    callback?: DispatchCallback
  ) => dispatch(slice.addChiefComplaint(body)).unwrap().then(callback);

  const createURLName = (chiefComplaint: IChiefComplaint) =>
    `${chiefComplaint.title.split(" ").join("_")}`;

  return {
    allChiefComplaints,
    chiefComplaint,
    addChiefComplaint,
    getChiefComplaintSelectOptions,
    createURLName,
  };
};
