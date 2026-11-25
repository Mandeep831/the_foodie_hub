
import { Router } from "express";
import {
  getAllIngredients,
  getIngredientsByRecipe,
  updateIngredients,
} from "../controllers/ingredientController.js";
import { validateIngredient } from "../middleware/validateIngredient.js";

const router = Router();

// Get ingredients for all recipes
router.get("/", getAllIngredients);

// Get ingredients for one recipe
router.get("/:recipeName", getIngredientsByRecipe);

// Replace the ingredients for one recipe
router.put("/:recipeName", validateIngredient, updateIngredients);

export default router;
