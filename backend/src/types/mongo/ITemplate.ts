import { z } from "zod";
import { MONGO_ID_REGEX } from "../../constants.ts";

export const ITemplate = z.object({
  _id: z.string().regex(MONGO_ID_REGEX).optional(),
  title: z.string(),
  description: z.string(),
  resources: z
    .object({
      resource: z.string().regex(MONGO_ID_REGEX, {
        message: "Invalid Chief Complaint ID",
      }),
    })
    .array()
    .default([]),
});

export type ITemplate = z.infer<typeof ITemplate>;
