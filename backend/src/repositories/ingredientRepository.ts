
import { prisma } from "../prisma.js";

const formatRecipeIngredients = (recipe: {
  name: string;
  ingredients: {
    ingredient: {
      name: string;
      description: string;
    };
  }[];
}) => ({
  recipeName: recipe.name,
  ingredients: recipe.ingredients.map(({ ingredient }) => ({
    name: ingredient.name,
    description: ingredient.description,
  })),
});

export const getAllIngredients = async () => {
  const recipes = await prisma.recipe.findMany({
    include: {
      ingredients: {
        include: {
          ingredient: true,
        },
      },
    },
  });

  return recipes.map(formatRecipeIngredients);
};

export const getIngredientsByRecipeName = async (
  recipeName: string
) => {
  const recipe = await prisma.recipe.findFirst({
    where: { name: recipeName },
    include: {
      ingredients: {
        include: {
          ingredient: true,
        },
      },
    },
  });

  return recipe ? formatRecipeIngredients(recipe) : null;
};

export const updateRecipeIngredients = async (
  recipeName: string,
  ingredients: { name: string; description: string }[]
) => {
  return prisma.$transaction(async (tx) => {
    const recipe = await tx.recipe.findFirst({
      where: { name: recipeName },
    });

    if (!recipe) {
      throw new Error("Recipe not found.");
    }

    await tx.recipeIngredient.deleteMany({
      where: { recipeId: recipe.id },
    });

    for (const item of ingredients) {
      let ingredient = await tx.ingredient.findFirst({
        where: {
          name: item.name,
          description: item.description,
        },
      });

      if (!ingredient) {
        ingredient = await tx.ingredient.create({
          data: {
            name: item.name,
            description: item.description,
          },
        });
      }

      await tx.recipeIngredient.create({
        data: {
          recipeId: recipe.id,
          ingredientId: ingredient.id,
        },
      });
    }

    const updatedRecipe = await tx.recipe.findUnique({
      where: { id: recipe.id },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });

    if (!updatedRecipe) {
      throw new Error("Updated recipe could not be found.");
    }

    return formatRecipeIngredients(updatedRecipe);
  });
};
