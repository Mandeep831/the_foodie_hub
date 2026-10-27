
import { useState } from "react";
import AddRecipeForm from "./AddRecipeForm";

import type { Recipe } from "../../data/recipes";
import type { RecipeIngredients } from "../ingredients/IngredientsList";
import type { Review } from "../Reviews/review";

interface RecipeListProps {
  recipes: Recipe[];
  addRecipe: (recipe: Recipe) => void;
  removeRecipe: (id: number) => void;
  updateRecipe: (
    id: number,
    updatedRecipe: Recipe
  ) => void;
  ingredientsData: RecipeIngredients[];
  setIngredientsData: React.Dispatch<
    React.SetStateAction<RecipeIngredients[]>
  >;
  reviews: Review[];
  activityCount: number;
  setActivityCount: React.Dispatch<
    React.SetStateAction<number>
  >;
}

function RecipeList({
  recipes,
  addRecipe,
  removeRecipe,
  updateRecipe,
  ingredientsData,
  setIngredientsData,
  reviews,
  activityCount,
  setActivityCount,
}: RecipeListProps) {
  const [selectedRecipe, setSelectedRecipe] =
    useState<number | null>(null);

  return (
    <section className="recipe-list">
      <h2>Popular Recipes</h2>

      <p>Shared Activity Count: {activityCount}</p>

      <button
        type="button"
        onClick={() =>
          setActivityCount((count) => count + 1)
        }
      >
        Increase Activity
      </button>

      <AddRecipeForm
        addRecipe={addRecipe}
        ingredientsData={ingredientsData}
        setIngredientsData={setIngredientsData}
      />

      <div className="recipe-cards">
        {recipes.map((recipe) => {
          const selectedIngredients =
            ingredientsData.find(
              (item) => item.recipeName === recipe.name
            );

          const selectedReviews = reviews.filter(
            (review) => review.recipeName === recipe.name
          );

          const isSelected = selectedRecipe === recipe.id;

          return (
            <article
              className="recipe-card"
              key={recipe.id}
            >
              <div className="recipe-image">
                <span>🍽️</span>
              </div>

              <div className="recipe-content">
                <h3>{recipe.name}</h3>
                <p>{recipe.description}</p>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedRecipe(
                      isSelected ? null : recipe.id
                    )
                  }
                >
                  {isSelected
                    ? "Hide Ingredients and Reviews"
                    : "View Ingredients"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    removeRecipe(recipe.id);

                    setIngredientsData((current) =>
                      current.filter(
                        (item) =>
                          item.recipeName !== recipe.name
                      )
                    );

                    setSelectedRecipe(null);
                  }}
                >
                  Remove Recipe
                </button>

                <button
                  type="button"
                  onClick={() =>
                    updateRecipe(recipe.id, {
                      ...recipe,
                      description: `${recipe.description}`,
                    })
                  }
                >
                  Save Recipe
                </button>

                {isSelected && (
                  <div className="recipe-details">
                    <h4>Ingredients</h4>

                    {selectedIngredients &&
                    selectedIngredients.ingredients.length > 0 ? (
                      <ul>
                        {selectedIngredients.ingredients.map(
                          (ingredient) => (
                            <li key={ingredient.name}>
                              <strong>{ingredient.name}</strong>
                              <p>{ingredient.description}</p>
                            </li>
                          )
                        )}
                      </ul>
                    ) : (
                      <p>No ingredients available yet.</p>
                    )}

                    <h4>Reviews</h4>

                    {selectedReviews.length > 0 ? (
                      <div className="recipe-reviews">
                        {selectedReviews.map((review) => (
                          <div
                            className="recipe-review"
                            key={review.id}
                          >
                            <p>
                              <strong>{review.reviewer}</strong>
                              {" — "}
                              {review.rating}/5
                            </p>
                            <p>{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>No reviews available yet.</p>
                    )}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default RecipeList;
