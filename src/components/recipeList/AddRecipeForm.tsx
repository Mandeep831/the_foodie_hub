import { useState } from "react";

interface Recipe {
  id: number;
  name: string;
  description: string;
}

interface AddRecipeFormProps {
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
}

function AddRecipeForm({ recipes, setRecipes }: AddRecipeFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim() || !description.trim()) {
      return;
    }

    const newRecipe = {
      id: recipes.length + 1,
      name: name.trim(),
      description: description.trim(),
    };

    setRecipes([...recipes, newRecipe]);

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
        onChange={(event) => setName(event.target.value)}
      />

      <input
        type="text"
        placeholder="Recipe description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <button type="submit">Add Recipe</button>
    </form>
  );
}

export default AddRecipeForm;