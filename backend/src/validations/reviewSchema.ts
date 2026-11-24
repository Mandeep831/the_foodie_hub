import { z } from "zod";

export const reviewSchema = z.object({
  recipeId: z.number().int().positive(),
  reviewer: z.string().trim().min(1, "Reviewer name is required"),
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().min(1, "Comment is required"),
});