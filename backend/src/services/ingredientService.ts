
import * as ingredientRepository from "../repositories/ingredientRepository.js";

export const getAllIngredients = () => {
  return ingredientRepository.getAllIngredients();
};

export const getIngredientsByRecipe = (recipeName: string) => {
  if (!recipeName.trim()) {
    throw new Error("Recipe name is required.");
  }

  return ingredientRepository.getIngredientsByRecipeName(
    recipeName.trim()
  );
};

export const updateIngredients = (
  recipeName: string,
  ingredients: { name: string; description: string }[]
) => {
  if (!recipeName.trim()) {
    throw new Error("Recipe name is required.");
  }

  if (!Array.isArray(ingredients)) {
    throw new Error("Ingredients must be an array.");
  }

  for (const ingredient of ingredients) {
    if (
      !ingredient.name?.trim() ||
      !ingredient.description?.trim()
    ) {
      throw new Error(
        "Ingredient name and description are required."
      );
    }
  }

  const cleanedIngredients = ingredients.map((ingredient) => ({
    name: ingredient.name.trim(),
    description: ingredient.description.trim(),
  }));

  return ingredientRepository.updateRecipeIngredients(
    recipeName.trim(),
    cleanedIngredients
  );
};

