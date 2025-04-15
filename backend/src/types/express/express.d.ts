declare global {
  namespace Express {
    export interface Request {
      appointment?: import("../mongo/IAppointment.js").IAppointment;
      chief_complaint?: import("../mongo/IChiefComplaint.js").IChiefComplaint;
      patient?: import("../mongo/IPatient.js").IPatient;
      resource?: import("../mongo/IResource.js").IResource;
      template?: import("../mongo/ITemplate.js").ITemplate;
      report?: import("../mongo/IReport.js").IReport;
      consultation?: import("../mongo/IConsultation.js").IConsultation;
      user?: any;
      myUser: import("../mongo/IUser.js").IUser;
    }

    export interface User {
      role: "admin" | "user";
    }
  }
}

export {};
