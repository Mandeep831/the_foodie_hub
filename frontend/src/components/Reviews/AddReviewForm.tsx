
import { useState } from "react";
import type { ReviewInput } from "../../repositories/reviewRepository";

interface AddReviewFormProps {
  addReview: (
    review: ReviewInput,
    recipeName: string
  ) => Promise<void>;

  recipes: {
    id: number;
    name: string;
  }[];
}

function AddReviewForm({
  addReview,
  recipes,
}: AddReviewFormProps) {
  const [recipeId, setRecipeId] = useState("");
  const [reviewer, setReviewer] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const selectedRecipe = recipes.find(
      (recipe) => recipe.id === Number(recipeId)
    );

    if (
      !selectedRecipe ||
      !reviewer.trim() ||
      !rating ||
      !comment.trim()
    ) {
      setError("Please complete all review fields.");
      return;
    }

    const newReview: ReviewInput = {
      recipeId: selectedRecipe.id,
      reviewer,
      rating: Number(rating),
      comment,
    };

    try {
      setSubmitting(true);
      setError("");

      await addReview(newReview, selectedRecipe.name);

      setRecipeId("");
      setReviewer("");
      setRating("");
      setComment("");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to add review."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add a Review</h3>

      <select
        value={recipeId}
        onChange={(event) =>
          setRecipeId(event.target.value)
        }
        required
      >
        <option value="">Select Recipe</option>

        {recipes.map((recipe) => (
          <option key={recipe.id} value={recipe.id}>
            {recipe.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Your name"
        value={reviewer}
        onChange={(event) =>
          setReviewer(event.target.value)
        }
        required
      />

      <select
        value={rating}
        onChange={(event) =>
          setRating(event.target.value)
        }
        required
      >
        <option value="">Select rating</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>

      <input
        type="text"
        placeholder="Write your review"
        value={comment}
        onChange={(event) =>
          setComment(event.target.value)
        }
        required
      />

      {error && <p role="alert">{error}</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? "Adding Review..." : "Add Review"}
      </button>
    </form>
  );
}

export default AddReviewForm;
