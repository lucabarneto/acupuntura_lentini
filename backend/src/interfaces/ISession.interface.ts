import { z } from "zod";
import { Types } from "mongoose";

const MongoIdFormat = /[\da-f]{24}/;

const ISession = z.object({
  _id: z.string().optional(),
  treatment: z.string(),
  evolution: z.string(),
  patient: z.string().transform((val, ctx) => {
    if (!MongoIdFormat.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid Patient Id",
      });

      return z.NEVER;
    }

    return new Types.ObjectId(val);
  }),
  chief_complaint: z.string().transform((val, ctx) => {
    if (!MongoIdFormat.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid Chief complaint Id",
      });

      return z.NEVER;
    }

    return new Types.ObjectId(val);
  }),
  appointment: z.string().transform((val, ctx) => {
    if (!MongoIdFormat.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid Appointment Id",
      });

      return z.NEVER;
    }

    return new Types.ObjectId(val);
  }),
});

type ISession = z.infer<typeof ISession>;

export default ISession;
