import {
  reviewRepository,
  type ReviewInput,
} from "../repositories/reviewRepository";

import type { Review } from "../data/reviews";

function validateReview(review: ReviewInput): ReviewInput {
  const reviewer = review.reviewer.trim();
  const comment = review.comment.trim();

  if (!Number.isInteger(review.recipeId) || review.recipeId <= 0) {
    throw new Error("Please select a valid recipe.");
  }

  if (!reviewer) {
    throw new Error("Reviewer name is required.");
  }

  if (!comment) {
    throw new Error("Review comment is required.");
  }

  if (
    !Number.isInteger(review.rating) ||
    review.rating < 1 ||
    review.rating > 5
  ) {
    throw new Error("Rating must be between 1 and 5.");
  }

  return {
    ...review,
    reviewer,
    comment,
  };
}

export const reviewService = {
  async getAllReviews(): Promise<Review[]> {
    return reviewRepository.getAll();
  },

  async getReviewById(
    id: number
  ): Promise<Review | undefined> {
    return reviewRepository.getById(id);
  },

  async addReview(
    review: ReviewInput,
    recipeName: string
  ): Promise<Review> {
    return reviewRepository.create(
      validateReview(review),
      recipeName
    );
  },

  async updateReview(
    id: number,
    review: ReviewInput,
    recipeName: string
  ): Promise<Review | undefined> {
    return reviewRepository.update(
      id,
      validateReview(review),
      recipeName
    );
  },

  async deleteReview(id: number): Promise<boolean> {
    return reviewRepository.delete(id);
  },
};