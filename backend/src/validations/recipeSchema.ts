import { z } from "zod";

export const recipeSchema = z.object({
  name: z.string().trim().min(1, "Recipe name is required."),
  description: z.string().trim().min(1, "Recipe description is required."),
});