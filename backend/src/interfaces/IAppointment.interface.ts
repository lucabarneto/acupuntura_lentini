import { z } from "zod";
import { Types } from "mongoose";

const MongoIdFormat = /[\da-f]{24}/;

const IAppointment = z.object({
  date: z.string().date(),
  time: z.string().time(),
  expired: z.boolean().default(false),
  patient_is_notified: z.boolean().default(false),
  patient_assisted: z.boolean().default(false),
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
});

type IAppointment = z.infer<typeof IAppointment>;

export default IAppointment;
