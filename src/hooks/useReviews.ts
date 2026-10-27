import { useState } from "react";
import { reviewService } from "../services/reviewService";
import type { Review } from "../data/reviews";

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>(
    () => reviewService.getAllReviews()
  );

  function addReview(review: Review): void {
    const createdReview = reviewService.addReview(review);

    setReviews((currentReviews: Review[]) => [
      ...currentReviews,
      createdReview,
    ]);
  }

  function removeReview(id: number): void {
    const deleted = reviewService.deleteReview(id);

    if (deleted) {
      setReviews((currentReviews: Review[]) =>
        currentReviews.filter(
          (review: Review) => review.id !== id
        )
      );
    }
  }

  function updateReview(
    id: number,
    updatedReview: Review
  ): void {
    const updated = reviewService.updateReview(
      id,
      updatedReview
    );

    if (updated) {
      setReviews((currentReviews: Review[]) =>
        currentReviews.map((review: Review) =>
          review.id === id ? updated : review
        )
      );
    }
  }

  return {
    reviews,
    addReview,
    removeReview,
    updateReview,
  };
}