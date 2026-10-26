
import { useState } from "react";
import type { FormEvent } from "react";

import type { Recipe } from "../../data/recipes";
import type { RecipeIngredients } from "../ingredients/IngredientsList";

interface AddRecipeFormProps {
  addRecipe: (recipe: Recipe) => void;
  ingredientsData: RecipeIngredients[];
  setIngredientsData: React.Dispatch<
    React.SetStateAction<RecipeIngredients[]>
  >;
}

function AddRecipeForm({
  addRecipe,
  ingredientsData,
  setIngredientsData,
}: AddRecipeFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName || !trimmedDescription) {
      setError("Please enter a recipe name and description.");
      return;
    }

    const newRecipe: Recipe = {
      id: Date.now(),
      name: trimmedName,
      description: trimmedDescription,
    };

    try {
      addRecipe(newRecipe);

      setIngredientsData([
        ...ingredientsData,
        {
          recipeName: trimmedName,
          ingredients: [],
        },
      ]);

      setName("");
      setDescription("");
      setError("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to add recipe."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add a Recipe</h3>

      <input
        type="text"
        placeholder="Recipe name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <input
        type="text"
        placeholder="Recipe description"
        value={description}
        onChange={(event) =>
          setDescription(event.target.value)
        }
      />

      {error && <p role="alert">{error}</p>}

      <button type="submit">Add Recipe</button>
    </form>
  );
}

export default AddRecipeForm;
