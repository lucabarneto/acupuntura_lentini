import { Request } from "express";
import IAppointment from "./IAppointment.interface.ts";
import IChiefComplaint from "./IChiefComplaint.interface.ts";
import IPatient from "./IPatient.interface.ts";
import IResource from "./IResource.interface.ts";
import ISession from "./ISession.interface.ts";
import ITemplate from "./ITemplate.interface.ts";

export {};

declare global {
  namespace Express {
    export interface Request {
      appointment?: IAppointment;
      chief_complaint?: IChiefComplaint;
      patient?: IPatient;
      resource?: IResource;
      session?: ISession;
      template?: ITemplate;
    }
  }
}
