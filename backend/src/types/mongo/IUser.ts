import { z } from "zod";
import { MONGO_ID_REGEX, EMAIL_REGEX } from "../../constants.js";

export const IUser = z.object({
  _id: z.string().regex(MONGO_ID_REGEX).optional(),
  first_name: z.string(),
  last_name: z.string(),
  role: z.enum(["admin", "user"]).default("user"),
  email: z.string().regex(EMAIL_REGEX),
  password: z.string().min(1),
});

export type IUser = z.infer<typeof IUser>;
