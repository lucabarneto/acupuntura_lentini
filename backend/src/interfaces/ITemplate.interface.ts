import { z } from "zod";

const ITemplate = z.object({
  _id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  resources: z
    .object({
      resource: z.string().regex(new RegExp("[0-9a-f]{24}"), {
        message: "Invalid Chief Complaint ID",
      }),
    })
    .array()
    .default([]),
});

type ITemplate = z.infer<typeof ITemplate>;

export default ITemplate;
