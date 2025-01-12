import { Request } from "express";
import { IAppointment } from "../mongo/IAppointment.ts";
import { IChiefComplaint } from "../mongo/IChiefComplaint.ts";
import { IPatient } from "../mongo/IPatient.ts";
import { IResource } from "../mongo/IResource.ts";
import { ISession } from "../mongo/ISession.ts";
import { ITemplate } from "../mongo/ITemplate.ts";
import { IReport } from "../mongo/IReport.ts";

declare global {
  namespace Express {
    export interface Request {
      appointment?: IAppointment;
      chief_complaint?: IChiefComplaint;
      patient?: IPatient;
      resource?: IResource;
      session?: ISession;
      template?: ITemplate;
      report?: IReport;
    }
  }
}

export {};
