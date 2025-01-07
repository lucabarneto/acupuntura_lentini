import { z } from "zod";

export const IResource = z.object({
  _id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  input_values: z.string().array().default([]),
});

export type IResource = z.infer<typeof IResource>;
