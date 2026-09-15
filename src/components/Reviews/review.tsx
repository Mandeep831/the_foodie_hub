function Reviews() {
  const reviews = [
    {
      id: 1,
      recipeName: "Paneer Tikka",
      reviewer: "Simran",
      rating: 5,
      comment: "Very tasty and easy to make!",
    },
    {
      id: 2,
      recipeName: "Chole Bhature",
      reviewer: "Aman",
      rating: 4,
      comment: "The recipe was delicious and filling.",
    },
    {
      id: 3,
      recipeName: "Margherita Pizza",
      reviewer: "Priya",
      rating: 5,
      comment: "Simple ingredients and great taste!",
    },
  ];

  return (
    <section className="reviews">
      <h2>Recipe Reviews</h2>

      <div className="review-list">
        {reviews.map((review) => (
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