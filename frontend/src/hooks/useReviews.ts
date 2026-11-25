
import { useEffect, useState } from "react";
import { reviewService } from "../services/reviewService";
import type { Review } from "../data/reviews";
import type { ReviewInput } from "../repositories/reviewRepository";

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadReviews() {
      try {
        const data = await reviewService.getAllReviews();
        setReviews(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Unable to load reviews."
        );
      } finally {
        setLoading(false);
      }
    }

    void loadReviews();
  }, []);

  async function addReview(
    review: ReviewInput,
    recipeName: string
  ): Promise<void> {
    const createdReview = await reviewService.addReview(
      review,
      recipeName
    );

    setReviews((currentReviews) => [
      ...currentReviews,
      createdReview,
    ]);
  }

  async function removeReview(id: number): Promise<void> {
    const deleted = await reviewService.deleteReview(id);

    if (deleted) {
      setReviews((currentReviews) =>
        currentReviews.filter((review) => review.id !== id)
      );
    }
  }

  async function updateReview(
    id: number,
    updatedReview: ReviewInput,
    recipeName: string
  ): Promise<void> {
    const updated = await reviewService.updateReview(
      id,
      updatedReview,
      recipeName
    );

    if (updated) {
      setReviews((currentReviews) =>
        currentReviews.map((review) =>
          review.id === id ? updated : review
        )
      );
    }
  }

  return {
    reviews,
    loading,
    error,
    addReview,
    removeReview,
    updateReview,
  };
}
