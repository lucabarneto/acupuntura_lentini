import { SortOrder } from "mongoose";

type PatientSortQueries = {
  first_name?: SortOrder;
  appointment?: SortOrder;
};

type ReportSortQueries = {
  date: SortOrder;
};

type PatientFilterQueries = {};

type ReportFilterQueries = {};

export type SortQueries = PatientSortQueries | ReportSortQueries;
export type FilterQueries = PatientFilterQueries | ReportFilterQueries;
