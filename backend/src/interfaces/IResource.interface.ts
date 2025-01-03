import { z } from "zod";

const IResource = z.object({
  _id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
});

type IResource = z.infer<typeof IResource>;

export default IResource;
