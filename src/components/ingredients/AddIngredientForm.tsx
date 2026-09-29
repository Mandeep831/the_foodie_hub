import { useState } from "react";
import type { Dispatch, FormEvent, SetStateAction } from "react";

interface Ingredient {
  name: string;
  description: string;
}

interface RecipeIngredients {
  recipeName: string;
  ingredients: Ingredient[];
}

interface AddIngredientFormProps {
  ingredientsData: RecipeIngredients[];
  setIngredientsData: Dispatch<SetStateAction<RecipeIngredients[]>>;
}

function AddIngredientForm({
  ingredientsData,
  setIngredientsData,
}: AddIngredientFormProps) {
  const [recipeName, setRecipeName] = useState("");
  const [ingredientName, setIngredientName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !recipeName ||
      !ingredientName.trim() ||
      !description.trim()
    ) {
      return;
    }

    setIngredientsData(
      ingredientsData.map((recipe) =>
        recipe.recipeName === recipeName
          ? {
              ...recipe,
              ingredients: [
                ...recipe.ingredients,
                {
                  name: ingredientName.trim(),
                  description: description.trim(),
                },
              ],
            }
          : recipe
      )
    );

    setIngredientName("");
    setDescription("");
  };

  return (
    <form className="add-ingredient-form" onSubmit={handleSubmit}>
      <h3>Add Ingredient</h3>

      <select
        value={recipeName}
        onChange={(event) => setRecipeName(event.target.value)}
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
        onChange={(event) => setIngredientName(event.target.value)}
      />

      <input
        type="text"
        placeholder="Ingredient description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <button type="submit">Add Ingredient</button>
    </form>
  );
}

export default AddIngredientForm;