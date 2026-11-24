import {
  ingredientRepository,
} from "../repositories/ingredientRepository";

import type {
  RecipeIngredients,
} from "../data/ingredients";

class IngredientService {
  getAllIngredients(): RecipeIngredients[] {
    return ingredientRepository.getAll();
  }

  getIngredientsByRecipe(
    recipeName: string
  ): RecipeIngredients | undefined {
    return ingredientRepository.getByRecipeName(
      recipeName
    );
  }

  addIngredients(
    recipe: RecipeIngredients
  ): RecipeIngredients {
    return ingredientRepository.create(recipe);
  }

  updateIngredients(
    recipeName: string,
    recipe: RecipeIngredients
  ): RecipeIngredients | undefined {
    return ingredientRepository.update(
      recipeName,
      recipe
    );
  }

  removeIngredients(
    recipeName: string
  ): boolean {
    return ingredientRepository.delete(
      recipeName
    );
  }
}

export const ingredientService =
  new IngredientService();