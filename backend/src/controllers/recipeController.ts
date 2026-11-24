import type { Request, Response } from "express";
import * as recipeService from "../services/recipeService.js";

export const getRecipes = async (_req: Request, res: Response) => {
  try {
    const recipes = await recipeService.getAllRecipes();
    res.status(200).json(recipes);
  } catch {
    res.status(500).json({ message: "Failed to fetch recipes." });
  }
};

export const getRecipe = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ message: "Invalid recipe ID." });
      return;
    }

    const recipe = await recipeService.getRecipeById(id);

    if (!recipe) {
      res.status(404).json({ message: "Recipe not found." });
      return;
    }

    res.status(200).json(recipe);
  } catch {
    res.status(500).json({ message: "Failed to fetch recipe." });
  }
};

export const addRecipe = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    if (typeof name !== "string" || typeof description !== "string" || !name.trim() || !description.trim()) {
      res.status(400).json({ message: "Name and description are required." });
      return;
    }

    const recipe = await recipeService.createRecipe(name, description);
    res.status(201).json(recipe);
  } catch {
    res.status(500).json({ message: "Failed to create recipe." });
  }
};

export const editRecipe = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, description } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ message: "Invalid recipe ID." });
      return;
    }

    if (typeof name !== "string" || typeof description !== "string" || !name.trim() || !description.trim()) {
      res.status(400).json({ message: "Name and description are required." });
      return;
    }

    const recipe = await recipeService.updateRecipe(id, name, description);
    res.status(200).json(recipe);
  } catch {
    res.status(500).json({ message: "Failed to update recipe." });
  }
};

export const removeRecipe = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ message: "Invalid recipe ID." });
      return;
    }

    await recipeService.deleteRecipe(id);
    res.status(200).json({ message: "Recipe deleted successfully." });
  } catch {
    res.status(500).json({ message: "Failed to delete recipe." });
  }
};