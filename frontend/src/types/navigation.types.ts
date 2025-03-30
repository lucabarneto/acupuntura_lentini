export type MainPanes =
  | "patients"
  | "resources"
  | "templates"
  | "reports"
  | "appointments"
  | "home";

export type DetailsPanes =
  | InfoDetailsPanes
  | AddDetailsPanes
  | UpdateDetailsPanes;

type InfoDetailsPanes =
  | "patient"
  | "resource"
  | "template"
  | "report"
  | "appointment"
  | "chiefcomplaint"
  | "consultation";

type AddDetailsPanes =
  | "add"
  | "addpatient"
  | "addbazitable"
  | "addpresumptiveanalysis"
  | "addchiefcomplaint"
  | "addconsultation"
  | "addappointment"
  | "addreport"
  | "addtemplate"
  | "addresource";

type UpdateDetailsPanes =
  | "updatepatient"
  | "updatechiefcomplaint"
  | "updateconsultation"
  | "updateappointment"
  | "updatereport"
  | "updatetemplate"
  | "updateresource";
