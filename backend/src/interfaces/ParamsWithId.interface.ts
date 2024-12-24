import { z } from "zod";

const ParamsWithId = z.object({
  id: z.string().regex(new RegExp("[0-9a-f]{24}"), { message: "Invalid ID" }),
});

type ParamsWithId = z.infer<typeof ParamsWithId>;

export default ParamsWithId;
