
import type { Request, Response } from "express";
import * as ingredientService from "../services/ingredientService.js";

export const getAllIngredients = async (
  _req: Request,
  res: Response
) => {
  try {
    const ingredients = await ingredientService.getAllIngredients();

    res.status(200).json(ingredients);
  } catch (error) {
    console.error("Error fetching ingredients:", error);

    res.status(500).json({
      message: "Failed to fetch ingredients.",
    });
  }
};

export const getIngredientsByRecipe = async (
  req: Request,
  res: Response
) => {
  try {
    const recipeName = decodeURIComponent(
      String(req.params.recipeName ?? "")
    );

    const ingredients =
      await ingredientService.getIngredientsByRecipe(recipeName);

    if (!ingredients) {
      res.status(404).json({
        message: "Recipe ingredients not found.",
      });
      return;
    }

    res.status(200).json(ingredients);
  } catch (error) {
    console.error("Error fetching recipe ingredients:", error);

    res.status(500).json({
      message: "Failed to fetch recipe ingredients.",
    });
  }
};

export const updateIngredients = async (
  req: Request,
  res: Response
) => {
  try {
    const recipeName = decodeURIComponent(
      String(req.params.recipeName ?? "")
    );

    const { ingredients } = req.body;

    const updatedIngredients =
      await ingredientService.updateIngredients(
        recipeName,
        ingredients
      );

    res.status(200).json(updatedIngredients);
  } catch (error) {
    console.error("Error updating ingredients:", error);

    if (
      error instanceof Error &&
      error.message === "Recipe not found."
    ) {
      res.status(404).json({
        message: error.message,
      });
      return;
    }

    res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Failed to update ingredients.",
    });
  }
};
