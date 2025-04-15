import { z } from "zod";
import { MONGO_ID_REGEX } from "../../constants.js";

export const IResource = z.object({
  _id: z.string().regex(MONGO_ID_REGEX).optional(),
  title: z.string(),
  description: z.string().optional(),
  image: z.string().default(""),
  resource_values: z.string().array().default([]),
});

export type IResource = z.infer<typeof IResource>;
