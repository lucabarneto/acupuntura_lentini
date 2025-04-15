import { z } from "zod";
import { MONGO_ID_REGEX, MIN_DATE } from "../../constants.js";
import { Types } from "mongoose";

export const IReport = z.object({
  _id: z.string().regex(MONGO_ID_REGEX).optional(),
  creation_date: z.number().min(MIN_DATE),
  diagnosis: z.string(),
  treatment: z.string(),
  last_recorded_evolution: z.string(),
  initial_patient_tongue: z.string().optional(),
  last_recorded_patient_tongue: z.string().optional(),
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
        message: "Invalid Patient Id",
      });

      return z.NEVER;
    }

    return new Types.ObjectId(val);
  }),
});

export type IReport = z.infer<typeof IReport>;
