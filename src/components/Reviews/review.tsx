export const recipeReviews = [
  {
    id: 1,
    recipeName: "Paneer Tikka",
    reviewer: "Simran",
    rating: 5,
    comment: "Very tasty and easy to make!",
  },
  {
    id: 2,
    recipeName: "Paneer Tikka",
    reviewer: "Aman",
    rating: 4,
    comment: "The paneer was soft and full of flavour.",
  },
  {
    id: 3,
    recipeName: "Chole Bhature",
    reviewer: "Priya",
    rating: 5,
    comment: "The recipe was delicious and filling.",
  },
  {
    id: 4,
    recipeName: "Chole Bhature",
    reviewer: "Mandeep",
    rating: 4,
    comment: "The chickpeas had a great taste.",
  },
  {
    id: 5,
    recipeName: "Margherita Pizza",
    reviewer: "Simran",
    rating: 5,
    comment: "Simple ingredients and great taste!",
  },
  {
    id: 6,
    recipeName: "Margherita Pizza",
    reviewer: "Gagandeep",
    rating: 4,
    comment: "The pizza was cheesy and delicious.",
  },
  {
    id: 7,
    recipeName: "Vegetable Fried Rice",
    reviewer: "Mandeep",
    rating: 5,
    comment: "Quick to prepare and full of flavour.",
  },
  {
    id: 8,
    recipeName: "Vegetable Fried Rice",
    reviewer: "Aman",
    rating: 4,
    comment: "The vegetables added a nice crunch.",
  },
  {
    id: 9,
    recipeName: "Aloo Gobi",
    reviewer: "Simran",
    rating: 4,
    comment: "A delicious homemade Indian dish.",
  },
  {
    id: 10,
    recipeName: "Aloo Gobi",
    reviewer: "Priya",
    rating: 5,
    comment: "The potatoes and cauliflower tasted great together.",
  },
  {
    id: 11,
    recipeName: "Chicken Noodles",
    reviewer: "Aman",
    rating: 5,
    comment: "The noodles were tasty and filling.",
  },
  {
    id: 12,
    recipeName: "Chicken Noodles",
    reviewer: "Gagandeep",
    rating: 4,
    comment: "A quick and satisfying meal.",
  },
  {
    id: 13,
    recipeName: "Vegetable Biryani",
    reviewer: "Mandeep",
    rating: 5,
    comment: "The rice was fragrant and full of flavour.",
  },
  {
    id: 14,
    recipeName: "Vegetable Biryani",
    reviewer: "Simran",
    rating: 4,
    comment: "The vegetables made the biryani delicious.",
  },
  {
    id: 15,
    recipeName: "Masala Dosa",
    reviewer: "Priya",
    rating: 5,
    comment: "The dosa was crispy and delicious.",
  },
  {
    id: 16,
    recipeName: "Masala Dosa",
    reviewer: "Aman",
    rating: 4,
    comment: "The potato filling was very tasty.",
  },
  {
    id: 17,
    recipeName: "Tacos",
    reviewer: "Gagandeep",
    rating: 5,
    comment: "The tacos were fresh and full of flavour.",
  },
  {
    id: 18,
    recipeName: "Tacos",
    reviewer: "Mandeep",
    rating: 4,
    comment: "The toppings made the tacos delicious.",
  },
];

function Reviews() {
  return (
    <section className="reviews">
      <h2>Recipe Reviews</h2>

      <div className="review-list">
        {recipeReviews.map((review) => (
          <article className="review-card" key={review.id}>
            <h3>{review.recipeName}</h3>

            <p>
              <strong>{review.reviewer}</strong> — {review.rating}/5
            </p>

            <p>{review.comment}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Reviews;