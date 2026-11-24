import { prisma } from "../prisma.js";

export const getAllRecipes = () => {
  return prisma.recipe.findMany({
    include: {
      ingredients: {
        include: {
          ingredient: true,
        },
      },
      reviews: true,
    },
  });
};

export const getRecipeById = (id: number) => {
  return prisma.recipe.findUnique({
    where: { id },
    include: {
      ingredients: {
        include: {
          ingredient: true,
        },
      },
      reviews: true,
    },
  });
};

export const createRecipe = (name: string, description: string) => {
  return prisma.recipe.create({
    data: { name, description },
  });
};

export const updateRecipe = (
  id: number,
  name: string,
  description: string
) => {
  return prisma.recipe.update({
    where: { id },
    data: { name, description },
  });
};

export const deleteRecipe = (id: number) => {
  return prisma.recipe.delete({
    where: { id },
  });
};