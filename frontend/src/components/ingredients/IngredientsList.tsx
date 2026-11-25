
import { useState } from "react";
import IngredientSearchForm from "./IngredientSearchForm";
import AddIngredientForm from "./AddIngredientForm";

import type {
  RecipeIngredients,
} from "../../data/ingredients";

import {
  ingredientService,
} from "../../services/ingredientService";

export type {
  Ingredient,
  RecipeIngredients,
} from "../../data/ingredients";

export {
  recipeIngredients,
} from "../../data/ingredients";

interface IngredientsListProps {
  activityCount: number;
  setActivityCount: React.Dispatch<
    React.SetStateAction<number>
  >;

  ingredientsData: RecipeIngredients[];

  setIngredientsData: React.Dispatch<
    React.SetStateAction<RecipeIngredients[]>
  >;
}

function IngredientsList({
  activityCount,
  setActivityCount,
  ingredientsData,
  setIngredientsData,
}: IngredientsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const filteredRecipes = searchTerm.trim()
    ? ingredientsData.filter((recipe) =>
        recipe.ingredients.some((ingredient) =>
          ingredient.name
            .toLowerCase()
            .includes(searchTerm.trim().toLowerCase())
        )
      )
    : ingredientsData;

  const handleRemoveIngredient = async (
    recipeName: string,
    ingredientName: string
  ) => {
    setError("");

    const recipe = ingredientsData.find(
      (item) => item.recipeName === recipeName
    );

    if (!recipe) {
      setError("Recipe not found.");
      return;
    }

    const updatedRecipe: RecipeIngredients = {
      ...recipe,
      ingredients: recipe.ingredients.filter(
        (ingredient) => ingredient.name !== ingredientName
      ),
    };

    try {
      setLoading(true);

      const savedRecipe =
        await ingredientService.updateIngredients(
          recipeName,
          updatedRecipe
        );

      setIngredientsData((previousData) =>
        previousData.map((item) =>
          item.recipeName === recipeName
            ? savedRecipe
            : item
        )
      );
    } catch (error) {
      console.error("Failed to remove ingredient:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to remove ingredient."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="ingredients-list">
      <h2>Recipe Ingredients</h2>

      <p>
        Shared Activity Count: {activityCount}
      </p>

      <button
        type="button"
        onClick={() =>
          setActivityCount((count) => count + 1)
        }
      >
        Increase Activity
      </button>

      <IngredientSearchForm
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <AddIngredientForm
        ingredientsData={ingredientsData}
        setIngredientsData={setIngredientsData}
      />

      {error && (
        <p className="error-message">{error}</p>
      )}

      <div className="ingredient-cards">
        {filteredRecipes.map((recipe) => (
          <article
            className="ingredient-card"
            key={recipe.recipeName}
          >
            <div className="ingredient-content">
              <h3>{recipe.recipeName}</h3>

              <ul>
                {recipe.ingredients.map((ingredient) => (
                  <li key={ingredient.name}>
                    <strong>{ingredient.name}</strong>

                    <p>{ingredient.description}</p>

                    <button
                      type="button"
                      disabled={loading}
                      onClick={() =>
                        handleRemoveIngredient(
                          recipe.recipeName,
                          ingredient.name
                        )
                      }
                    >
                      {loading ? "Saving..." : "Remove Ingredient"}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default IngredientsList;
