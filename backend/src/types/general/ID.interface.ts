import { z } from "zod";

export const ID = z
  .string()
  .regex(new RegExp("[0-9a-f]{24}"), { message: "Invalid ID" });

export type ID = z.infer<typeof ID>;
