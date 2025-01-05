import { sessionDAO } from "../database/sessions.dao.ts";
import ISession from "../interfaces/ISession.interface.ts";
import { BaseService } from "./base.service.ts";

class SessionService extends BaseService<ISession, typeof sessionDAO> {}

export const sessionService = new SessionService(sessionDAO);
