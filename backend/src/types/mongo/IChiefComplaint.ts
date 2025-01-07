import { Types } from "mongoose";
import { z } from "zod";

const MongoIdFormat = /[\da-f]{24}/;

export const IChiefComplaint = z.object({
  _id: z.string().optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  diagnosis: z.string().min(1),
  initial_sleep_condition: z.string(),
  initial_medicine: z.string(),
  state: z.enum(["finished", "in_progress"]),
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
  patient_evolution: z
    .object({
      session: z.string().regex(new RegExp("[0-9a-f]{24}"), {
        message: "Invalid Session ID",
      }),
    })
    .array()
    .default([]),
});

export type IChiefComplaint = z.infer<typeof IChiefComplaint>;

IChiefComplaint;
