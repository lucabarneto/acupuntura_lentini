import { ISession } from "../types/mongo/ISession.ts";
import { sessionDAO } from "../database/sessions.dao.ts";
import { BaseService } from "./base.service.ts";

class SessionService extends BaseService<ISession, typeof sessionDAO> {
  findEqual = (data: ISession, sessions: ISession[]): boolean =>
    sessions.some(
      (session) => session.date.toString() === data.date.toString()
    );
}

export const sessionService = new SessionService(sessionDAO);
