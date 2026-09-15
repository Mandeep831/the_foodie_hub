function IngredientsList() {
  const ingredients = [
    {
      id: 1,
      name: "Paneer",
      description: "Indian cottage cheese used in many vegetarian dishes.",
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
              <span>🥗</span>
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