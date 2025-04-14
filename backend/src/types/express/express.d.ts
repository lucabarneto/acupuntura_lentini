import { Request } from "express";
import { IAppointment } from "../mongo/IAppointment";
import { IChiefComplaint } from "../mongo/IChiefComplaint";
import { IPatient } from "../mongo/IPatient";
import { IResource } from "../mongo/IResource";
import { IConsultation } from "../mongo/IConsultation";
import { ITemplate } from "../mongo/ITemplate";
import { IReport } from "../mongo/IReport";
import { IUser } from "../mongo/IUser";

declare global {
  namespace Express {
    export interface Request {
      appointment?: IAppointment;
      chief_complaint?: IChiefComplaint;
      patient?: IPatient;
      resource?: IResource;
      template?: ITemplate;
      report?: IReport;
      consultation?: IConsultation;
      user?: any;
      myUser: IUser;
    }

    export interface User {
      role: "admin" | "user";
    }
  }
}

export {};
