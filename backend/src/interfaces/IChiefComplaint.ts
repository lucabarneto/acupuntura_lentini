import { z } from "zod";
import { Types } from "mongoose";

const MongoIDFormat = /[\da-f]{24}/;

const IChiefComplaint = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  diagnosis: z.string().min(1),
  initial_sleep_condition: z.string(),
  initial_medicine: z.string(),
  state: z.enum(["finished, in_progress"]),
  patient: z.object({
    type: z.string().refine(
      (val) => {
        return MongoIDFormat.test(val) ? new Types.ObjectId(val) : false;
      },
      { message: "Invalid ID" }
    ),
    ref: z.literal("patients"),
  }),
});

type IChiefComplaint = z.infer<typeof IChiefComplaint>;

export default IChiefComplaint;
