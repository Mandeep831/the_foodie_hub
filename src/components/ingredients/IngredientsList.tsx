export const recipeIngredients = [
  {
    recipeName: "Paneer Tikka",
    ingredients: [
      {
        name: "Paneer",
        description:
          "Indian cottage cheese used as the main ingredient.",
      },
      {
        name: "Yogurt",
        description:
          "Used to marinate the paneer and make it soft and flavourful.",
      },
      {
        name: "Bell Peppers",
        description:
          "Add colour, flavour, and crunch to the dish.",
      },
      {
        name: "Spices",
        description:
          "Add flavour, aroma, and seasoning.",
      },
    ],
  },
    {
      id: 2,
      name: "Chickpeas",
      description: "Protein-rich legumes commonly used in curries and salads.",
    },
    {
      id: 3,
      name: "Mozzarella Cheese",
      description: "A soft cheese commonly used as a pizza topping.",
    },
  ];

  return (
    <section className="ingredientsList">
      <h2>Popular Ingredients</h2>

      <div className="ingredient-cards">
        {ingredients.map((ingredient) => (
          <article className="ingredient-card" key={ingredient.id}>
            <div className="ingredient-image">
              <span></span>
            </div>

            <div className="ingredient-content">
              <h3>{ingredient.name}</h3>
              <p>{ingredient.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default IngredientsList;