import type { Request, Response, NextFunction } from "express";
import { recipeSchema } from "../validations/recipeSchema.js";

export const validateRecipe = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = recipeSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      message: "Invalid recipe data.",
      errors: result.error.issues,
    });
    return;
  }

  req.body = result.data;
  next();
};