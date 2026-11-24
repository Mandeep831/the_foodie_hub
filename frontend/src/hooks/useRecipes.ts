import { useEffect, useState } from "react";
import { recipeService } from "../services/recipeService";
import type { Recipe } from "../data/recipes";

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRecipes() {
      try {
        const data = await recipeService.getAllRecipes();
        setRecipes(data);
      } catch {
        setError("Unable to load recipes from the server.");
      } finally {
        setLoading(false);
      }
    }

    loadRecipes();
  }, []);

  async function addRecipe(recipe: Recipe): Promise<void> {
    const createdRecipe = await recipeService.addRecipe(recipe);
    setRecipes((current) => [...current, createdRecipe]);
  }

  async function removeRecipe(id: number): Promise<void> {
    await recipeService.deleteRecipe(id);
    setRecipes((current) => current.filter((recipe) => recipe.id !== id));
  }

  async function updateRecipe(
    id: number,
    updatedRecipe: Recipe
  ): Promise<void> {
    const updated = await recipeService.updateRecipe(id, updatedRecipe);
    setRecipes((current) =>
      current.map((recipe) => recipe.id === id ? updated : recipe)
    );
  }

  return {
    recipes,
    loading,
    error,
    addRecipe,
    removeRecipe,
    updateRecipe,
  };
}
