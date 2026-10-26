import { useState } from "react";
import { useIngredients } from "../../hooks/useIngredients";

function IngredientsList() {
  const { ingredientsData } = useIngredients();

  const [searchTerm, setSearchTerm] =
    useState("");

  const filteredRecipes = searchTerm.trim()
    ? ingredientsData.filter((recipe) =>
        recipe.ingredients.some((ingredient) =>
          ingredient.name
            .toLowerCase()
            .includes(
              searchTerm.trim().toLowerCase()
            )
        )
      )
    : ingredientsData;

  /*
   * Uses the custom hook to get ingredient data.
   * The hook connects this component to the
   * ingredient service and repository.
   */
  return (
    <section className="ingredients-list">
      <h2>Recipe Ingredients</h2>

      <input
        type="text"
        placeholder="Search ingredients"
        value={searchTerm}
        onChange={(event) =>
          setSearchTerm(event.target.value)
        }
      />

      <div className="ingredient-cards">
        {filteredRecipes.map((recipe) => (
          <article
            className="ingredient-card"
            key={recipe.recipeName}
          >
            <h3>{recipe.recipeName}</h3>

            <ul>
              {recipe.ingredients.map(
                (ingredient) => (
                  <li key={ingredient.name}>
                    <strong>
                      {ingredient.name}
                    </strong>

                    <p>
                      {ingredient.description}
                    </p>
                  </li>
                )
              )}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

export default IngredientsList;