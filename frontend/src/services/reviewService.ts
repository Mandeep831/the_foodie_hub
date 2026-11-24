import { reviewRepository } from "../repositories/reviewRepository";
import type { Review } from "../data/reviews";

export const reviewService = {
  getAllReviews(): Review[] {
    return reviewRepository.getAll();
  },

  getReviewById(id: number): Review | undefined {
    return reviewRepository.getById(id);
  },

  addReview(review: Review): Review {
    const trimmedReviewer = review.reviewer.trim();
    const trimmedComment = review.comment.trim();

    if (!trimmedReviewer) {
      throw new Error("Reviewer name is required.");
    }

    if (!trimmedComment) {
      throw new Error("Review comment is required.");
    }

    if (review.rating < 1 || review.rating > 5) {
      throw new Error("Rating must be between 1 and 5.");
    }

    const newReview: Review = {
      ...review,
      reviewer: trimmedReviewer,
      comment: trimmedComment,
    };

    return reviewRepository.create(newReview);
  },

  updateReview(
    id: number,
    review: Review
  ): Review | undefined {
    const trimmedReviewer = review.reviewer.trim();
    const trimmedComment = review.comment.trim();

    if (!trimmedReviewer) {
      throw new Error("Reviewer name is required.");
    }

    if (!trimmedComment) {
      throw new Error("Review comment is required.");
    }

    if (review.rating < 1 || review.rating > 5) {
      throw new Error("Rating must be between 1 and 5.");
    }

    const updatedReview: Review = {
      ...review,
      reviewer: trimmedReviewer,
      comment: trimmedComment,
    };

    return reviewRepository.update(id, updatedReview);
  },

  deleteReview(id: number): boolean {
    return reviewRepository.delete(id);
  },
};