
import { useState } from "react";
import type {
  Dispatch,
  FormEvent,
  SetStateAction,
} from "react";

import type {
  RecipeIngredients,
} from "../../data/ingredients";

import {
  ingredientService,
} from "../../services/ingredientService";

interface AddIngredientFormProps {
  ingredientsData: RecipeIngredients[];
  setIngredientsData: Dispatch<
    SetStateAction<RecipeIngredients[]>
  >;
}

function AddIngredientForm({
  ingredientsData,
  setIngredientsData,
}: AddIngredientFormProps) {
  const [recipeName, setRecipeName] = useState("");
  const [ingredientName, setIngredientName] =
    useState("");
  const [description, setDescription] =
    useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError("");

    if (
      !recipeName ||
      !ingredientName.trim() ||
      !description.trim()
    ) {
      setError("Please complete all fields.");
      return;
    }

    const recipe = ingredientsData.find(
      (item) => item.recipeName === recipeName
    );

    if (!recipe) {
      setError("Recipe not found.");
      return;
    }

    const updatedRecipe: RecipeIngredients = {
      ...recipe,
      ingredients: [
        ...recipe.ingredients,
        {
          name: ingredientName.trim(),
          description: description.trim(),
        },
      ],
    };

    try {
      setLoading(true);

      const savedRecipe =
        await ingredientService.updateIngredients(
          recipeName,
          updatedRecipe
        );

      setIngredientsData((previousData) =>
        previousData.map((item) =>
          item.recipeName === recipeName
            ? savedRecipe
            : item
        )
      );

      setIngredientName("");
      setDescription("");
      setRecipeName("");
    } catch (error) {
      console.error("Failed to add ingredient:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to add ingredient."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="add-ingredient-form"
      onSubmit={handleSubmit}
    >
      <h3>Add Ingredient</h3>

      <select
        value={recipeName}
        onChange={(event) =>
          setRecipeName(event.target.value)
        }
      >
        <option value="">Select Recipe</option>

        {ingredientsData.map((recipe) => (
          <option
            key={recipe.recipeName}
            value={recipe.recipeName}
          >
            {recipe.recipeName}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Ingredient name"
        value={ingredientName}
        onChange={(event) =>
          setIngredientName(event.target.value)
        }
      />

      <input
        type="text"
        placeholder="Ingredient description"
        value={description}
        onChange={(event) =>
          setDescription(event.target.value)
        }
      />

      {error && <p className="error-message">{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Add Ingredient"}
      </button>
    </form>
  );
}

export default AddIngredientForm;
