import { SortOrder } from "mongoose";

type PatientSortQueries = {
  first_name?: SortOrder;
  appointment?: SortOrder;
};

type ReportSortQueries = {
  creation_date: SortOrder;
};

export type SortQueries = PatientSortQueries | ReportSortQueries;
