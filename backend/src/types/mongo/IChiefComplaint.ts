import { Types } from "mongoose";
import { z } from "zod";
import { MONGO_ID_REGEX } from "../../constants.ts";

export const IChiefComplaint = z.object({
  _id: z.string().regex(MONGO_ID_REGEX).optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  diagnosis: z.string().min(1),
  initial_sleep_condition: z.string(),
  initial_medicine: z.string(),
  state: z.enum(["finished", "in_progress"]),
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
  sessions: z
    .object({
      session: z.string().regex(MONGO_ID_REGEX, {
        message: "Invalid Session ID",
      }),
    })
    .array()
    .default([]),
});

export type IChiefComplaint = z.infer<typeof IChiefComplaint>;
