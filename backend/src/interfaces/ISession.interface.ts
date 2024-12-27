import { z } from "zod";
import { Types } from "mongoose";

const MongoIdFormat = /[\da-f]{24}/;

const ISession = z.object({
  _id: z.string().optional(),
  date: z.string().date(),
  treatment: z.string(),
  evolution: z.string(),
  chief_complaint: z.string().transform((val, ctx) => {
    if (!MongoIdFormat.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid Patient Id",
      });

      return z.NEVER;
    }

    return new Types.ObjectId(val);
  }),
});

type ISession = z.infer<typeof ISession>;

export default ISession;
