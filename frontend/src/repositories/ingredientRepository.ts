
import type { RecipeIngredients } from "../data/ingredients";

const RECIPES_API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api/recipes";

const INGREDIENTS_API_URL = RECIPES_API_URL.replace(
  /\/api\/recipes\/?$/,
  "/api/ingredients"
);

class IngredientRepository {
  async getAll(): Promise<RecipeIngredients[]> {
    const response = await fetch(INGREDIENTS_API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch ingredients.");
    }

    return response.json();
  }

  async getByRecipeName(
    recipeName: string
  ): Promise<RecipeIngredients | undefined> {
    const response = await fetch(
      `${INGREDIENTS_API_URL}/${encodeURIComponent(recipeName)}`
    );

    if (response.status === 404) {
      return undefined;
    }

    if (!response.ok) {
      throw new Error("Failed to fetch recipe ingredients.");
    }

    return response.json();
  }

  async create(
    recipe: RecipeIngredients
  ): Promise<RecipeIngredients> {
    return this.update(recipe.recipeName, recipe);
  }

  async update(
    recipeName: string,
    updatedRecipe: RecipeIngredients
  ): Promise<RecipeIngredients> {
    const response = await fetch(
      `${INGREDIENTS_API_URL}/${encodeURIComponent(recipeName)}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredients: updatedRecipe.ingredients,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update recipe ingredients.");
    }

    return response.json();
  }

  async delete(recipeName: string): Promise<boolean> {
    const response = await fetch(
      `${INGREDIENTS_API_URL}/${encodeURIComponent(recipeName)}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: [] }),
      }
    );

    if (response.status === 404) {
      return false;
    }

    if (!response.ok) {
      throw new Error("Failed to remove recipe ingredients.");
    }

    return true;
  }
}

export const ingredientRepository = new IngredientRepository();
