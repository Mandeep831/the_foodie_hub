import type { Request, Response, NextFunction } from "express";
import { recipeIdSchema } from "../validations/recipeIdSchema.js";

export const validateRecipeId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = recipeIdSchema.safeParse(req.params);

  if (!result.success) {
    res.status(400).json({
      message: "Invalid recipe ID.",
      errors: result.error.issues,
    });
    return;
  }

  next();
};