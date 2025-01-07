import { z } from "zod";

export const RequestParams = z.object({
  id: z.string().regex(new RegExp("[0-9a-f]{24}"), { message: "Invalid ID" }),
  second_id: z
    .string()
    .regex(new RegExp("[0-9a-f]{24}"), { message: "Invalid ID" })
    .optional(),
});

export type RequestParams = z.infer<typeof RequestParams>;
