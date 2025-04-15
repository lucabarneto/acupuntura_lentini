import { Types } from "mongoose";
import { z } from "zod";
import { MONGO_ID_REGEX } from "../../constants.js";

export const IChiefComplaint = z.object({
  _id: z.string().regex(MONGO_ID_REGEX).optional(),
  title: z.string().min(1),
  diagnosis: z.string().min(1),
  initial_sleep_condition: z.string(),
  initial_medicine: z.string(),
  state: z.enum(["finished", "in_progress"]).default("in_progress"),
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
  report: z
    .string()
    .transform((val, ctx) => {
      if (!MONGO_ID_REGEX.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid Patient Id",
        });

        return z.NEVER;
      }

      return new Types.ObjectId(val);
    })
    .optional(),
  consultations: z
    .object({
      consultation: z.string().regex(MONGO_ID_REGEX, {
        message: "Invalid Session ID",
      }),
    })
    .array()
    .default([]),
});

export type IChiefComplaint = z.infer<typeof IChiefComplaint>;
