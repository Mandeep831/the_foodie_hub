
import { useState } from "react";
import { recipeService } from "../services/recipeService";
import type { Recipe } from "../data/recipes";

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>(
    () => recipeService.getAllRecipes()
  );

  function addRecipe(recipe: Recipe): void {
    const createdRecipe = recipeService.addRecipe(recipe);

    setRecipes((currentRecipes) => [
      ...currentRecipes,
      createdRecipe,
    ]);
  }

  function removeRecipe(id: number): void {
    const deleted = recipeService.deleteRecipe(id);

    if (deleted) {
      setRecipes((currentRecipes) =>
        currentRecipes.filter((recipe) => recipe.id !== id)
      );
    }
  }

  function updateRecipe(
    id: number,
    updatedRecipe: Recipe
  ): void {
    const updated = recipeService.updateRecipe(
      id,
      updatedRecipe
    );

    if (updated) {
      setRecipes((currentRecipes) =>
        currentRecipes.map((recipe) =>
          recipe.id === id ? updated : recipe
        )
      );
    }
  }

  return {
    recipes,
    addRecipe,
    removeRecipe,
    updateRecipe,
  };
}
