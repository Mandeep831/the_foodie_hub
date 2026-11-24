import type { Request, Response, NextFunction } from "express";
import { reviewSchema } from "../validations/reviewSchema.js";

export const validateReview = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = reviewSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      message: "Invalid review data",
      errors: result.error.issues,
    });
    return;
  }

  req.body = result.data;
  next();
};