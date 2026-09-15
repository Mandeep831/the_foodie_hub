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
    recipeName: "Chole Bhature",
    ingredients: [
      {
        name: "Chickpeas",
        description:
          "The main ingredient used to prepare the spicy curry.",
      },
      {
        name: "Flour",
        description:
          "Used to prepare the dough for the bhature.",
      },
      {
        name: "Onion",
        description:
          "Adds flavour and helps create the curry base.",
      },
      {
        name: "Tomato",
        description:
          "Helps create the curry sauce and adds a slightly tangy flavour.",
      },
      {
        name: "Spices",
        description:
          "Give the chickpea curry its traditional flavour.",
      },
    ],
  },
  {
    recipeName: "Margherita Pizza",
    ingredients: [
      {
        name: "Pizza Dough",
        description:
          "Forms the base of the pizza.",
      },
      {
        name: "Tomato Sauce",
        description:
          "Adds flavour and moisture to the pizza.",
      },
      {
        name: "Mozzarella Cheese",
        description:
          "Melts over the pizza and gives it a creamy texture.",
      },
      {
        name: "Basil",
        description:
          "Adds a fresh flavour and pleasant aroma.",
      },
    ],
  },

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