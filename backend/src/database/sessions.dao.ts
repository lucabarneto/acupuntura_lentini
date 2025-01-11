import { ISession } from "../types/mongo/ISession.ts";
import { SessionModel } from "../models/session.model.ts";
import { MongoDAO } from "./mongo.dao.ts";

class SessionDAO extends MongoDAO<ISession> {}

export const sessionDAO = new SessionDAO(SessionModel);
