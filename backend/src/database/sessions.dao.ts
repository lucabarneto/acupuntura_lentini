import ISession from "../interfaces/ISession.interface.ts";
import { SessionModel } from "../models/session.model.ts";
import { MongoDAO } from "./mongo.dao.ts";

class SessionDAO extends MongoDAO<ISession, typeof SessionModel> {}

export const sessionDAO = new SessionDAO(SessionModel);
