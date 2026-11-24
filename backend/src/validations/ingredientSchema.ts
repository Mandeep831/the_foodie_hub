
import { z } from "zod";

export const ingredientSchema = z.object({
  ingredients: z.array(
    z.object({
      name: z.string().trim().min(1, "Ingredient name is required."),
      description: z
        .string()
        .trim()
        .min(1, "Ingredient description is required."),
    })
  ),
});
