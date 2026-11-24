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

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      !recipeName ||
      !ingredientName.trim() ||
      !description.trim()
    ) {
      return;
    }

    const recipe =
      ingredientService.getIngredientsByRecipe(
        recipeName
      );

    if (!recipe) {
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

    ingredientService.updateIngredients(
      recipeName,
      updatedRecipe
    );

    setIngredientsData(
      ingredientService.getAllIngredients()
    );

    setIngredientName("");
    setDescription("");
    setRecipeName("");
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

      <button type="submit">
        Add Ingredient
      </button>
    </form>
  );
}

export default AddIngredientForm;