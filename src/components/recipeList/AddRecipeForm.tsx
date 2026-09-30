import { useState } from "react";
import type {
  Dispatch,
  FormEvent,
  SetStateAction,
} from "react";

interface Recipe {
  id: number;
  name: string;
  description: string;
}

interface Ingredient {
  name: string;
  description: string;
}

interface RecipeIngredients {
  recipeName: string;
  ingredients: Ingredient[];
}

interface AddRecipeFormProps {
  recipes: Recipe[];
  setRecipes: Dispatch<SetStateAction<Recipe[]>>;

  ingredientsData: RecipeIngredients[];
  setIngredientsData: Dispatch<
    SetStateAction<RecipeIngredients[]>
  >;
}

function AddRecipeForm({
  recipes,
  setRecipes,
  ingredientsData,
  setIngredientsData,
}: AddRecipeFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      !name.trim() ||
      !description.trim()
    ) {
      return;
    }

    const newRecipeName = name.trim();

    const newRecipe: Recipe = {
      id: Date.now(),
      name: newRecipeName,
      description: description.trim(),
    };

    // Add the new recipe
    setRecipes([
      ...recipes,
      newRecipe,
    ]);

    // Create an empty ingredient list
    // for the new recipe
    setIngredientsData([
      ...ingredientsData,
      {
        recipeName: newRecipeName,
        ingredients: [],
      },
    ]);

    setName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add a Recipe</h3>

      <input
        type="text"
        placeholder="Recipe name"
        value={name}
        onChange={(event) =>
          setName(event.target.value)
        }
      />

      <input
        type="text"
        placeholder="Recipe description"
        value={description}
        onChange={(event) =>
          setDescription(event.target.value)
        }
      />

      <button type="submit">
        Add Recipe
      </button>
    </form>
  );
}

export default AddRecipeForm;