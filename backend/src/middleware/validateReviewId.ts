import type { Request, Response, NextFunction } from "express";
import { reviewIdSchema } from "../validations/reviewIdSchema.js";

export const validateReviewId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = reviewIdSchema.safeParse(req.params);

  if (!result.success) {
    res.status(400).json({
      message: "Invalid review ID",
      errors: result.error.issues,
    });
    return;
  }

  next();
};