import { ISession } from "../types/mongo/ISession.ts";
import { sessionDAO } from "../database/sessions.dao.ts";
import { BaseService } from "./base.service.ts";

class SessionService extends BaseService<ISession, typeof sessionDAO> {
  findEqual = (data: ISession, sessions: ISession[]): boolean =>
    sessions.some(
      (session) =>
        session.date === data.date &&
        session.chief_complaint.toString() === data.chief_complaint.toString()
    );
}

export const sessionService = new SessionService(sessionDAO);
