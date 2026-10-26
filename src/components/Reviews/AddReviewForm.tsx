import { useState } from "react";
import type { Review } from "../../data/reviews";

interface AddReviewFormProps {
  addReview: (review: Review) => void;
  recipeNames: string[];
}

function AddReviewForm({
  addReview,
  recipeNames,
}: AddReviewFormProps) {
  const [recipeName, setRecipeName] = useState("");
  const [reviewer, setReviewer] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      recipeName === "" ||
      reviewer.trim() === "" ||
      rating === "" ||
      comment.trim() === ""
    ) {
      setError("Please complete all review fields.");
      return;
    }

    const newReview: Review = {
      id: Date.now(),
      recipeName,
      reviewer,
      rating: Number(rating),
      comment,
    };

    try {
      addReview(newReview);

      setRecipeName("");
      setReviewer("");
      setRating("");
      setComment("");
      setError("");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to add review."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add a Review</h3>

      <select
        value={recipeName}
        onChange={(event) =>
          setRecipeName(event.target.value)
        }
        required
      >
        <option value="">Select Recipe</option>

        {recipeNames.map((name) => (
          <option key={name} value={name}>
            {name}
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

      <button type="submit">
        Add Review
      </button>
    </form>
  );
}

export default AddReviewForm;