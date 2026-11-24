
import type { Request, Response, NextFunction } from "express";
import { ingredientSchema } from "../validations/ingredientSchema.js";

export const validateIngredient = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = ingredientSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      message: "Invalid ingredient data.",
      errors: result.error.issues,
    });
    return;
  }

  req.body = result.data;
  next();
};
