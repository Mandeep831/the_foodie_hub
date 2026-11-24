import { recipeReviews, type Review } from "../data/reviews";

let reviews: Review[] = [...recipeReviews];

export const reviewRepository = {
  getAll(): Review[] {
    return [...reviews];
  },

  getById(id: number): Review | undefined {
    return reviews.find((review) => review.id === id);
  },

  create(review: Review): Review {
    reviews = [...reviews, review];
    return review;
  },

  update(
    id: number,
    updatedReview: Review
  ): Review | undefined {
    const exists = reviews.some(
      (review) => review.id === id
    );

    if (!exists) {
      return undefined;
    }

    reviews = reviews.map((review) =>
      review.id === id ? updatedReview : review
    );

    return updatedReview;
  },

  delete(id: number): boolean {
    const exists = reviews.some(
      (review) => review.id === id
    );

    if (!exists) {
      return false;
    }

    reviews = reviews.filter(
      (review) => review.id !== id
    );

    return true;
  },
};