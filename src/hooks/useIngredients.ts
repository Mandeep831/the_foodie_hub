import { useState } from "react";
import {
  ingredientService,
} from "../services/ingredientService";

import type {
  RecipeIngredients,
} from "../data/ingredients";

export function useIngredients() {
  const [ingredientsData, setIngredientsData] =
    useState<RecipeIngredients[]>(
      () => ingredientService.getAllIngredients()
    );

  const addRecipeIngredients = (
    recipe: RecipeIngredients
  ) => {
    const created =
      ingredientService.addIngredients(recipe);

    setIngredientsData(
      ingredientService.getAllIngredients()
    );

    return created;
  };

  const updateRecipeIngredients = (
    recipeName: string,
    recipe: RecipeIngredients
  ) => {
    const updated =
      ingredientService.updateIngredients(
        recipeName,
        recipe
      );

    setIngredientsData(
      ingredientService.getAllIngredients()
    );

    return updated;
  };

  const removeRecipeIngredients = (
    recipeName: string
  ) => {
    const removed =
      ingredientService.removeIngredients(
        recipeName
      );

    if (removed) {
      setIngredientsData(
        ingredientService.getAllIngredients()
      );
    }

    return removed;
  };

  const getRecipeIngredients = (
    recipeName: string
  ) => {
    return ingredientService.getIngredientsByRecipe(
      recipeName
    );
  };

  return {
    ingredientsData,
    addRecipeIngredients,
    updateRecipeIngredients,
    removeRecipeIngredients,
    getRecipeIngredients,
  };
}