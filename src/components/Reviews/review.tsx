import AddReviewForm from "./AddReviewForm";

export interface Review {
  id: number;
  recipeName: string;
  reviewer: string;
  rating: number;
  comment: string;
}

export const recipeReviews: Review[] = [
  {
    id: 1,
    recipeName: "Paneer Tikka",
    reviewer: "Aman",
    rating: 5,
    comment: "Very tasty and full of flavour!",
  },
  {
    id: 2,
    recipeName: "Paneer Tikka",
    reviewer: "Simran",
    rating: 4,
    comment: "Really good, especially with the chutney.",
  },
  {
    id: 3,
    recipeName: "Chole Bhature",
    reviewer: "Harpreet",
    rating: 5,
    comment: "The chole was delicious and spicy.",
  },
  {
    id: 4,
    recipeName: "Chole Bhature",
    reviewer: "Jasleen",
    rating: 4,
    comment: "Bhature was soft and crispy.",
  },
  {
    id: 5,
    recipeName: "Margherita Pizza",
    reviewer: "Daniel",
    rating: 5,
    comment: "Simple and delicious pizza.",
  },
  {
    id: 6,
    recipeName: "Margherita Pizza",
    reviewer: "Emily",
    rating: 4,
    comment: "Fresh and tasty.",
  },
  {
    id: 7,
    recipeName: "Vegetable Fried Rice",
    reviewer: "Raj",
    rating: 4,
    comment: "Good flavour and lots of vegetables.",
  },
  {
    id: 8,
    recipeName: "Vegetable Fried Rice",
    reviewer: "Neha",
    rating: 5,
    comment: "Really enjoyed this fried rice.",
  },
  {
    id: 9,
    recipeName: "Aloo Gobi",
    reviewer: "Kiran",
    rating: 5,
    comment: "Very flavourful and comforting.",
  },
  {
    id: 10,
    recipeName: "Aloo Gobi",
    reviewer: "Manpreet",
    rating: 4,
    comment: "Tasty and nicely spiced.",
  },
  {
    id: 11,
    recipeName: "Chicken Noodles",
    reviewer: "Arjun",
    rating: 5,
    comment: "The noodles were delicious.",
  },
  {
    id: 12,
    recipeName: "Chicken Noodles",
    reviewer: "Nav",
    rating: 4,
    comment: "Good combination of chicken and vegetables.",
  },
  {
    id: 13,
    recipeName: "Vegetable Biryani",
    reviewer: "Riya",
    rating: 5,
    comment: "Aromatic and delicious.",
  },
  {
    id: 14,
    recipeName: "Vegetable Biryani",
    reviewer: "Gurpreet",
    rating: 4,
    comment: "Lots of flavour and nicely cooked rice.",
  },
  {
    id: 15,
    recipeName: "Masala Dosa",
    reviewer: "Anjali",
    rating: 5,
    comment: "Crispy and delicious.",
  },
  {
    id: 16,
    recipeName: "Masala Dosa",
    reviewer: "Sonia",
    rating: 4,
    comment: "The potato filling was really tasty.",
  },
  {
    id: 17,
    recipeName: "Tacos",
    reviewer: "Chris",
    rating: 5,
    comment: "Fresh and delicious tacos.",
  },
  {
    id: 18,
    recipeName: "Tacos",
    reviewer: "Maya",
    rating: 4,
    comment: "Great combination of toppings.",
  },
];

interface ReviewsProps {
  activityCount: number;
  setActivityCount: React.Dispatch<
    React.SetStateAction<number>
  >;

  reviews: Review[];

  setReviews: React.Dispatch<
    React.SetStateAction<Review[]>
  >;

  recipeNames: string[];
}

function Reviews({
  activityCount,
  setActivityCount,
  reviews,
  setReviews,
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

      <p>Shared Activity Count: {activityCount}</p>

      <button
        type="button"
        onClick={() =>
          setActivityCount(activityCount + 1)
        }
      >
        Increase Activity
      </button>

      <AddReviewForm
        reviews={reviews}
        setReviews={setReviews}
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
                      setReviews(
                        reviews.filter(
                          (item) =>
                            item.id !== review.id
                        )
                      )
                    }
                  >
                    Remove Review
                  </button>
                </div>
              ))
            ) : (
              <p>No reviews available yet.</p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default Reviews;
