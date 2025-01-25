import { z } from "zod";

const SORT_REGEX = /(-1|1|asc|ascending|desc|descending)/;

export const RequestQueries = z.object({
  first_name: z.string().regex(SORT_REGEX).optional(),
  next_appointment: z.string().regex(SORT_REGEX).optional(),
  creation_date: z.string().regex(SORT_REGEX).optional(),
});

export type RequestQueries = z.infer<typeof RequestQueries>;
