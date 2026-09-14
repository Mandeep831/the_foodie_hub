function RecipeList() {
  const recipes = [
    {
      id: 1,
      name: "Paneer Tikka",
      description: "Grilled Indian cottage cheese with spices and vegetables.",
    },
    {
      id: 2,
      name: "Chole Bhature",
      description: "Spicy chickpeas served with fried bread.",
    },
    {
      id: 3,
      name: "Margherita Pizza",
      description: "Pizza topped with tomato sauce, mozzarella, and basil.",
    },
  ];

  return (
    <section className="recipe-list">
      <h2>Popular Recipes</h2>

      <div className="recipe-cards">
        {recipes.map((recipe) => (
          <article className="recipe-card" key={recipe.id}>
            <div className="recipe-image">
              <span>🍽️</span>
            </div>

            <div className="recipe-content">
              <h3>{recipe.name}</h3>
              <p>{recipe.description}</p>
              <button type="button">View Recipe</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default RecipeList;