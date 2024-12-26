import { z } from "zod";

const IChiefComplaint = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  diagnosis: z.string().min(1),
  initial_sleep_condition: z.string(),
  initial_medicine: z.string(),
  state: z.enum(["finished", "in_progress"]),
});

type IChiefComplaint = z.infer<typeof IChiefComplaint>;

export default IChiefComplaint;
