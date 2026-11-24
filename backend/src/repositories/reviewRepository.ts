
import { prisma } from "../prisma.js";

export const getAllReviews = () => {
  return prisma.review.findMany({
    include: {
      recipe: true,
    },
  });
};

export const getReviewById = (id: number) => {
  return prisma.review.findUnique({
    where: { id },
  });
};

export const createReview = (
  recipeId: number,
  reviewer: string,
  rating: number,
  comment: string
) => {
  return prisma.review.create({
    data: {
      recipeId,
      reviewer,
      rating,
      comment,
    },
  });
};

export const updateReview = (
  id: number,
  recipeId: number,
  reviewer: string,
  rating: number,
  comment: string
) => {
  return prisma.review.update({
    where: { id },
    data: {
      recipeId,
      reviewer,
      rating,
      comment,
    },
  });
};

export const deleteReview = (id: number) => {
  return prisma.review.delete({
    where: { id },
  });
};
