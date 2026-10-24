
import { recipeRepository } from "../repositories/recipeRepository";
import type { Recipe } from "../data/recipes";

export const recipeService = {
  getAllRecipes(): Recipe[] {
    return recipeRepository.getAll();
  },

  getRecipeById(id: number): Recipe | undefined {
    return recipeRepository.getById(id);
  },

  addRecipe(recipe: Recipe): Recipe {
    const trimmedName = recipe.name.trim();
    const trimmedDescription = recipe.description.trim();

    if (!trimmedName) {
      throw new Error("Recipe name is required.");
    }

    if (!trimmedDescription) {
      throw new Error("Recipe description is required.");
    }

    const newRecipe: Recipe = {
      ...recipe,
      name: trimmedName,
      description: trimmedDescription,
    };

    return recipeRepository.create(newRecipe);
  },

  updateRecipe(
    id: number,
    recipe: Recipe
  ): Recipe | undefined {
    if (!recipe.name.trim()) {
      throw new Error("Recipe name is required.");
    }

    if (!recipe.description.trim()) {
      throw new Error("Recipe description is required.");
    }

    return recipeRepository.update(id, {
      ...recipe,
      name: recipe.name.trim(),
      description: recipe.description.trim(),
    });
  },

  deleteRecipe(id: number): boolean {
    return recipeRepository.delete(id);
  },
};
