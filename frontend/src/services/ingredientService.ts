
import { ingredientRepository } from "../repositories/ingredientRepository";

import type { RecipeIngredients } from "../data/ingredients";

class IngredientService {
  async getAllIngredients(): Promise<RecipeIngredients[]> {
    return ingredientRepository.getAll();
  }

  async getIngredientsByRecipe(
    recipeName: string
  ): Promise<RecipeIngredients | undefined> {
    return ingredientRepository.getByRecipeName(recipeName);
  }

  async addIngredients(
    recipe: RecipeIngredients
  ): Promise<RecipeIngredients> {
    return ingredientRepository.create(recipe);
  }

  async updateIngredients(
    recipeName: string,
    recipe: RecipeIngredients
  ): Promise<RecipeIngredients> {
    return ingredientRepository.update(recipeName, recipe);
  }

  async removeIngredients(
    recipeName: string
  ): Promise<boolean> {
    return ingredientRepository.delete(recipeName);
  }
}

export const ingredientService = new IngredientService();
