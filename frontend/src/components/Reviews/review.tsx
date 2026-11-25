
import { useState } from "react";
import AddReviewForm from "./AddReviewForm";
import type { Review } from "../../data/reviews";
import type { ReviewInput } from "../../repositories/reviewRepository";

interface ReviewsProps {
  reviews: Review[];

  addReview: (
    review: ReviewInput,
    recipeName: string
  ) => Promise<void>;

  removeReview: (id: number) => Promise<void>;

  updateReview: (
    id: number,
    updatedReview: ReviewInput,
    recipeName: string
  ) => Promise<void>;

  activityCount: number;

  setActivityCount: React.Dispatch<
    React.SetStateAction<number>
  >;

  recipes: {
    id: number;
    name: string;
  }[];

  loading: boolean;
  error: string;
}

function Reviews({
  reviews,
  addReview,
  removeReview,
  updateReview,
  activityCount,
  setActivityCount,
  recipes,
  loading,
  error,
}: ReviewsProps) {
  const [actionError, setActionError] = useState("");

  const groupedReviews = recipes.map((recipe) => ({
    ...recipe,
    reviews: reviews.filter(
      (review) => review.recipeName === recipe.name
    ),
  }));

  async function handleRemove(id: number) {
    try {
      setActionError("");
      await removeReview(id);
    } catch (error) {
      setActionError(
        error instanceof Error
          ? error.message
          : "Unable to remove review."
      );
    }
  }

  async function handleUpdate(
    review: Review,
    recipeId: number
  ) {
    try {
      setActionError("");

      await updateReview(
        review.id,
        {
          recipeId,
          reviewer: review.reviewer,
          rating: review.rating,
          comment: review.comment,
        },
        review.recipeName
      );
    } catch (error) {
      setActionError(
        error instanceof Error
          ? error.message
          : "Unable to update review."
      );
    }
  }

  return (
    <section className="reviews">
      <h2>Recipe Reviews</h2>

      <p>Shared Activity Count: {activityCount}</p>

      <button
        type="button"
        onClick={() =>
          setActivityCount((currentCount) => currentCount + 1)
        }
      >
        Increase Activity
      </button>

      <AddReviewForm
        addReview={addReview}
        recipes={recipes}
      />

      {loading && <p>Loading reviews...</p>}

      {error && <p role="alert">{error}</p>}

      {actionError && <p role="alert">{actionError}</p>}

      {!loading && !error && (
        <div className="review-list">
          {groupedReviews.map((recipe) => (
            <article
              className="review-card"
              key={recipe.id}
            >
              <h3>{recipe.name}</h3>

              {recipe.reviews.length > 0 ? (
                recipe.reviews.map((review) => (
                  <div
                    className="review-item"
                    key={review.id}
                  >
                    <p>
                      <strong>{review.reviewer}</strong>
                      {" - "}
                      {review.rating}/5
                    </p>

                    <p>{review.comment}</p>

                    <button
                      type="button"
                      onClick={() =>
                        void handleRemove(review.id)
                      }
                    >
                      Remove Review
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        void handleUpdate(review, recipe.id)
                      }
                    >
                      Save Review
                    </button>
                  </div>
                ))
              ) : (
                <p>No reviews available yet.</p>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Reviews;
