import { z } from "zod";
import { Types } from "mongoose";
import { MONGO_ID_REGEX } from "../../constants/mongoIdRegex.ts";

export const ISession = z.object({
  _id: z.string().regex(MONGO_ID_REGEX).optional(),
  date: z.string().date(),
  treatment: z.string(),
  evolution: z.string(),
  patient_tongue: z.string().default(""),
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
  resources: z
    .object({
      resource: z.string().regex(MONGO_ID_REGEX, {
        message: "Invalid Session ID",
      }),
      selected_value: z.string(),
    })
    .array()
    .default([]),
});

export type ISession = z.infer<typeof ISession>;
