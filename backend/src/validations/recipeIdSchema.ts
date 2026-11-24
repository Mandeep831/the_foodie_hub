import { z } from "zod";

export const recipeIdSchema = z.object({
  id: z.string().regex(/^[1-9]\d*$/, "Recipe ID must be a positive integer."),
});