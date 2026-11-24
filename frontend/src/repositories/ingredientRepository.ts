import {
  recipeIngredients,
  type RecipeIngredients,
} from "../data/ingredients";

class IngredientRepository {
  private ingredients: RecipeIngredients[] = [
    ...recipeIngredients,
  ];

  getAll(): RecipeIngredients[] {
    return [...this.ingredients];
  }

  getByRecipeName(
    recipeName: string
  ): RecipeIngredients | undefined {
    return this.ingredients.find(
      (item) => item.recipeName === recipeName
    );
  }

  create(
    recipe: RecipeIngredients
  ): RecipeIngredients {
    this.ingredients.push(recipe);

    return recipe;
  }

  update(
    recipeName: string,
    updatedRecipe: RecipeIngredients
  ): RecipeIngredients | undefined {
    const index = this.ingredients.findIndex(
      (item) => item.recipeName === recipeName
    );

    if (index === -1) {
      return undefined;
    }

    this.ingredients[index] = updatedRecipe;

    return updatedRecipe;
  }

  delete(recipeName: string): boolean {
    const index = this.ingredients.findIndex(
      (item) => item.recipeName === recipeName
    );

    if (index === -1) {
      return false;
    }

    this.ingredients.splice(index, 1);

    return true;
  }
}

export const ingredientRepository =
  new IngredientRepository();