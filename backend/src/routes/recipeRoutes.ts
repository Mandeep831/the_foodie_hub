import { Router } from "express";
import { validateRecipeId } from "../middleware/validateRecipeId.js";
import {
  getRecipes,
  getRecipe,
  addRecipe,
  editRecipe,
  removeRecipe,
} from "../controllers/recipeController.js";
import { validateRecipe } from "../middleware/validateRecipe.js";

const router = Router();

router.get("/", getRecipes);
router.get("/:id", validateRecipeId, getRecipe);
router.post("/", validateRecipe, addRecipe);
router.put("/:id", validateRecipeId, editRecipe);
router.delete("/:id",validateRecipeId, removeRecipe);

export default router;