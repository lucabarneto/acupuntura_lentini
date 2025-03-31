import { z } from "zod";
import { Types } from "mongoose";
import { MONGO_ID_REGEX } from "../../constants.ts";

export const IConsultation = z.object({
  _id: z.string().regex(MONGO_ID_REGEX).optional(),
  date: z.string().date(),
  treatment: z.string().optional(),
  evolution: z.string().optional(),
  patient_tongue_image: z.string().optional(),
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
  resources: z
    .object({
      resource: z.string().regex(MONGO_ID_REGEX, {
        message: "Invalid Consultation ID",
      }),
      selected_value: z.string(),
    })
    .array()
    .default([]),
});

export type IConsultation = z.infer<typeof IConsultation>;
