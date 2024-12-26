import { z } from "zod";

const RequestParams = z.object({
  id: z.string().regex(new RegExp("[0-9a-f]{24}"), { message: "Invalid ID" }),
});

type RequestParams = z.infer<typeof RequestParams>;

export default RequestParams;
