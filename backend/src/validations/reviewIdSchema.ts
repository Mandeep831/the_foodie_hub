import { z } from "zod";

export const reviewIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});