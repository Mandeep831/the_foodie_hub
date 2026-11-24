import * as recipeRepository from "../repositories/recipeRepository.js";

export const getAllRecipes = () => {
  return recipeRepository.getAllRecipes();
};

export const getRecipeById = (id: number) => {
  return recipeRepository.getRecipeById(id);
};

export const createRecipe = (name: string, description: string) => {
  if (!name.trim() || !description.trim()) {
    throw new Error("Name and description are required.");
  }

  return recipeRepository.createRecipe(name.trim(), description.trim());
};

export const updateRecipe = (
  id: number,
  name: string,
  description: string
) => {
  if (!name.trim() || !description.trim()) {
    throw new Error("Name and description are required.");
  }

  return recipeRepository.updateRecipe(id, name.trim(), description.trim());
};

export const deleteRecipe = (id: number) => {
  return recipeRepository.deleteRecipe(id);
};