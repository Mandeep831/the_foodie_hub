import { Router } from "express";
import * as reviewController from "../controllers/reviewController.js";
import { validateReview } from "../middleware/validateReview.js";
import { validateReviewId } from "../middleware/validateReviewId.js";

const router = Router();

router.get("/", reviewController.getAllReviews);

router.get("/:id", validateReviewId, reviewController.getReviewById);

router.post("/", validateReview, reviewController.createReview);

router.put(
  "/:id",
  validateReviewId,
  validateReview,
  reviewController.updateReview
);

router.delete(
  "/:id",
  validateReviewId,
  reviewController.deleteReview
);

export default router;