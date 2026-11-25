
import * as reviewRepository from "../repositories/reviewRepository.js";

export const getAllReviews = async () => {
  return reviewRepository.getAllReviews();
};

export const getReviewById = async (id: number) => {
  return reviewRepository.getReviewById(id);
};

export const createReview = async (
  recipeId: number,
  reviewer: string,
  rating: number,
  comment: string
) => {
  return reviewRepository.createReview(
    recipeId,
    reviewer,
    rating,
    comment
  );
};

export const updateReview = async (
  id: number,
  recipeId: number,
  reviewer: string,
  rating: number,
  comment: string
) => {
  return reviewRepository.updateReview(
    id,
    recipeId,
    reviewer,
    rating,
    comment
  );
};

export const deleteReview = async (id: number) => {
  return reviewRepository.deleteReview(id);
};
