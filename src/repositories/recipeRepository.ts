
import {
  initialRecipes,
  type Recipe,
} from "../data/recipes";

let recipes: Recipe[] = [...initialRecipes];

export const recipeRepository = {
  getAll(): Recipe[] {
    return [...recipes];
  },

  getById(id: number): Recipe | undefined {
    return recipes.find((recipe) => recipe.id === id);
  },

  create(recipe: Recipe): Recipe {
    recipes = [...recipes, recipe];
    return recipe;
  },

  update(
    id: number,
    updatedRecipe: Recipe
  ): Recipe | undefined {
    const index = recipes.findIndex(
      (recipe) => recipe.id === id
    );

    if (index === -1) {
      return undefined;
    }

    recipes = recipes.map((recipe) =>
      recipe.id === id ? updatedRecipe : recipe
    );

    return updatedRecipe;
  },

  delete(id: number): boolean {
    const exists = recipes.some(
      (recipe) => recipe.id === id
    );

    if (!exists) {
      return false;
    }

    recipes = recipes.filter(
      (recipe) => recipe.id !== id
    );

    return true;
  },
};
