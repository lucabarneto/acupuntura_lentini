import { z } from "zod";
import { Types } from "mongoose";
import { MONGO_ID_REGEX, MIN_DATE } from "../../constants.js";

export const IAppointment = z.object({
  _id: z.string().regex(MONGO_ID_REGEX).optional(),
  date: z.number().min(MIN_DATE),
  expired: z.boolean().default(false),
  patient_is_notified: z.boolean().default(false),
  patient_assisted: z.boolean().default(false),
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
});

export type IAppointment = z.infer<typeof IAppointment>;
