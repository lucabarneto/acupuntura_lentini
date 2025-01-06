import { sessionDAO } from "../database/sessions.dao.ts";
import ISession from "../interfaces/ISession.interface.ts";
import { BaseService } from "./base.service.ts";

class SessionService extends BaseService<ISession, typeof sessionDAO> {
  findEqual = (data: ISession, sessions: ISession[]): boolean =>
    sessions.some(
      (session) =>
        session.appointment.toString() === data.appointment.toString()
    );
}

export const sessionService = new SessionService(sessionDAO);
