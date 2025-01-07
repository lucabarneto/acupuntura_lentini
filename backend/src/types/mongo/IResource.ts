import { z } from "zod";
import { MONGO_ID_REGEX } from "../../constants/mongoIdRegex.ts";

export const IResource = z.object({
  _id: z.string().regex(MONGO_ID_REGEX).optional(),
  title: z.string(),
  description: z.string(),
  image: z.string().default(""),
  input_values: z.string().array().default([]),
});

export type IResource = z.infer<typeof IResource>;
