
import { useEffect, useState } from "react";

import {
  ingredientService,
} from "../services/ingredientService";

import type {
  RecipeIngredients,
} from "../data/ingredients";

export function useIngredients() {
  const [ingredientsData, setIngredientsData] =
    useState<RecipeIngredients[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const refreshIngredients = async () => {
    try {
      setError("");

      const ingredients =
        await ingredientService.getAllIngredients();

      setIngredientsData(ingredients);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to load ingredients."
      );

      throw error;
    }
  };

  useEffect(() => {
    const loadIngredients = async () => {
      try {
        await refreshIngredients();
      } catch (error) {
        console.error("Failed to load ingredients:", error);
      } finally {
        setLoading(false);
      }
    };

    loadIngredients();
  }, []);

  const addRecipeIngredients = async (
    recipe: RecipeIngredients
  ) => {
    const created =
      await ingredientService.addIngredients(recipe);

    await refreshIngredients();

    return created;
  };

  const updateRecipeIngredients = async (
    recipeName: string,
    recipe: RecipeIngredients
  ) => {
    const updated =
      await ingredientService.updateIngredients(
        recipeName,
        recipe
      );

    await refreshIngredients();

    return updated;
  };

  const removeRecipeIngredients = async (
    recipeName: string
  ) => {
    const removed =
      await ingredientService.removeIngredients(recipeName);

    if (removed) {
      await refreshIngredients();
    }

    return removed;
  };

  const getRecipeIngredients = async (
    recipeName: string
  ) => {
    return ingredientService.getIngredientsByRecipe(recipeName);
  };

  return {
    ingredientsData,
    loading,
    error,
    addRecipeIngredients,
    updateRecipeIngredients,
    removeRecipeIngredients,
    getRecipeIngredients,
    refreshIngredients,
  };
}
