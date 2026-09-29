import { useState } from "react";

interface Review {
  id: number;
  recipeName: string;
  reviewer: string;
  rating: number;
  comment: string;
}

interface AddReviewFormProps {
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
}

function AddReviewForm({
  reviews,
  setReviews,
}: AddReviewFormProps) {
  const [recipeName, setRecipeName] = useState("");
  const [reviewer, setReviewer] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      recipeName.trim() === "" ||
      reviewer.trim() === "" ||
      rating === "" ||
      comment.trim() === ""
    ) {
      return;
    }

    const newReview: Review = {
      id: Date.now(),
      recipeName: recipeName.trim(),
      reviewer: reviewer.trim(),
      rating: Number(rating),
      comment: comment.trim(),
    };

    setReviews([...reviews, newReview]);

    setRecipeName("");
    setReviewer("");
    setRating("");
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add a Review</h3>

      <input
        type="text"
        placeholder="Recipe name"
        value={recipeName}
        onChange={(event) => setRecipeName(event.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Your name"
        value={reviewer}
        onChange={(event) => setReviewer(event.target.value)}
        required
      />

      <select
        value={rating}
        onChange={(event) => setRating(event.target.value)}
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
        onChange={(event) => setComment(event.target.value)}
        required
      />

      <button type="submit">Add Review</button>
    </form>
  );
}

export default AddReviewForm;