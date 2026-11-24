import AddReviewForm from "./AddReviewForm";
import type { Review } from "../../data/reviews";

interface ReviewsProps {
  reviews: Review[];
  addReview: (review: Review) => void;
  removeReview: (id: number) => void;
  updateReview: (
    id: number,
    updatedReview: Review
  ) => void;

  activityCount: number;

  setActivityCount: React.Dispatch<
    React.SetStateAction<number>
  >;

  recipeNames: string[];
}

/*
  Reviews receives review state and review actions from App.tsx.

  App.tsx uses the useReviews custom hook, which connects
  the component to the review service and repository.

  Architecture:
  Reviews component -> useReviews -> reviewService ->
  reviewRepository -> reviews test data
*/
function Reviews({
  reviews,
  addReview,
  removeReview,
  updateReview,
  activityCount,
  setActivityCount,
  recipeNames,
}: ReviewsProps) {
  const groupedReviews = recipeNames.map(
    (recipeName) => ({
      recipeName,
      reviews: reviews.filter(
        (review) =>
          review.recipeName === recipeName
      ),
    })
  );

  return (
    <section className="reviews">
      <h2>Recipe Reviews</h2>

      <p>
        Shared Activity Count: {activityCount}
      </p>

      <button
        type="button"
        onClick={() =>
          setActivityCount(
            (currentCount) =>
              currentCount + 1
          )
        }
      >
        Increase Activity
      </button>

      <AddReviewForm
        addReview={addReview}
        recipeNames={recipeNames}
      />

      <div className="review-list">
        {groupedReviews.map((recipe) => (
          <article
            className="review-card"
            key={recipe.recipeName}
          >
            <h3>{recipe.recipeName}</h3>

            {recipe.reviews.length > 0 ? (
              recipe.reviews.map((review) => (
                <div
                  className="review-item"
                  key={review.id}
                >
                  <p>
                    <strong>
                      {review.reviewer}
                    </strong>{" "}
                    — {review.rating}/5
                  </p>

                  <p>{review.comment}</p>

                  <button
                    type="button"
                    onClick={() =>
                      removeReview(review.id)
                    }
                  >
                    Remove Review
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      updateReview(
                        review.id,
                        review
                      )
                    }
                  >
                    Save Review
                  </button>
                </div>
              ))
            ) : (
              <p>
                No reviews available yet.
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default Reviews;