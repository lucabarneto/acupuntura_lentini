import { Request } from "express";
import { IAppointment } from "../mongo/IAppointment.ts";
import { IChiefComplaint } from "../mongo/IChiefComplaint.ts";
import { IPatient } from "../mongo/IPatient.ts";
import { IResource } from "../mongo/IResource.ts";
import { IConsultation } from "../mongo/IConsultation.ts";
import { ITemplate } from "../mongo/ITemplate.ts";
import { IReport } from "../mongo/IReport.ts";
import { IUser } from "../mongo/IUser.ts";

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
