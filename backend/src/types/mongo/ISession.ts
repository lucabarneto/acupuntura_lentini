import { z } from "zod";
import { Types } from "mongoose";
import { MONGO_ID_REGEX } from "../../constants/mongoIdRegex.ts";

export const ISession = z.object({
  _id: z.string().regex(MONGO_ID_REGEX).optional(),
  treatment: z.string(),
  evolution: z.string(),
  patient: z.string().transform((val, ctx) => {
    if (!MONGO_ID_REGEX.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid Patient Id",
      });

      return z.NEVER;
    }

    return new Types.ObjectId(val);
  }),
  chief_complaint: z.string().transform((val, ctx) => {
    if (!MONGO_ID_REGEX.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid Chief complaint Id",
      });

      return z.NEVER;
    }

    return new Types.ObjectId(val);
  }),
  appointment: z.string().transform((val, ctx) => {
    if (!MONGO_ID_REGEX.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid Appointment Id",
      });

      return z.NEVER;
    }

    return new Types.ObjectId(val);
  }),
});

export type ISession = z.infer<typeof ISession>;
