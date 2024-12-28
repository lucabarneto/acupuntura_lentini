import { z } from "zod";

const ID = z
  .string()
  .regex(new RegExp("[0-9a-f]{24}"), { message: "Invalid ID" });

type ID = z.infer<typeof ID>;

export default ID;
