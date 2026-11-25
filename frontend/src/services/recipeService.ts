import { recipeRepository } from "../repositories/recipeRepository";
import type { Recipe } from "../data/recipes";

export const recipeService = {
  async getAllRecipes(): Promise<Recipe[]> {
    return recipeRepository.getAll();
  },

  async getRecipeById(id: number): Promise<Recipe | undefined> {
    return recipeRepository.getById(id);
  },

  async addRecipe(recipe: Recipe): Promise<Recipe> {
    const name = recipe.name.trim();
    const description = recipe.description.trim();

    if (!name) {
      throw new Error("Recipe name is required.");
    }

    if (!description) {
      throw new Error("Recipe description is required.");
    }

    return recipeRepository.create({ name, description });
  },

  async updateRecipe(
    id: number,
    recipe: Recipe
  ): Promise<Recipe> {
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

  async deleteRecipe(id: number): Promise<boolean> {
    return recipeRepository.delete(id);
  },
};
