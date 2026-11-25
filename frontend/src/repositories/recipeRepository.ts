import type { Recipe } from "../data/recipes";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/recipes";

export const recipeRepository = {
  async getAll(): Promise<Recipe[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }

    return response.json();
  },

  async getById(id: number): Promise<Recipe | undefined> {
    const response = await fetch(`${API_URL}/${id}`);

    if (response.status === 404) return undefined;

    if (!response.ok) {
      throw new Error("Failed to fetch recipe");
    }

    return response.json();
  },

  async create(recipe: Omit<Recipe, "id">): Promise<Recipe> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipe),
    });

    if (!response.ok) {
      throw new Error("Failed to create recipe");
    }

    return response.json();
  },

  async update(
    id: number,
    updatedRecipe: Recipe
  ): Promise<Recipe> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: updatedRecipe.name,
        description: updatedRecipe.description,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update recipe");
    }

    return response.json();
  },

  async delete(id: number): Promise<boolean> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (response.status === 404) return false;

    if (!response.ok) {
      throw new Error("Failed to delete recipe");
    }

    return true;
  },
};
