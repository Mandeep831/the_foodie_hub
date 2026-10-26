
import { beforeEach, describe, expect, it } from "vitest";
import { recipeRepository } from "../repositories/recipeRepository";
import { recipeService } from "../services/recipeService";
import { initialRecipes } from "../data/recipes";

describe("Recipe Repository and Service", () => {
  beforeEach(() => {
    // Arrange: Reset repository data before every test.
    recipeRepository.getAll().forEach((recipe) => {
      recipeRepository.delete(recipe.id);
    });

    initialRecipes.forEach((recipe) => {
      recipeRepository.create({ ...recipe });
    });
  });

  // Repository tests

  it("gets all recipes", () => {
    // Arrange
    const expectedRecipes = initialRecipes;

    // Act
    const result = recipeRepository.getAll();

    // Assert
    expect(result).toEqual(expectedRecipes);
  });

  it("gets a recipe by ID", () => {
    // Arrange
    const expectedRecipe = initialRecipes[0];

    // Act
    const result = recipeRepository.getById(expectedRecipe.id);

    // Assert
    expect(result).toEqual(expectedRecipe);
  });

  it("creates a recipe", () => {
    // Arrange
    const newRecipe = {
      id: 999,
      name: "Test Recipe",
      description: "A recipe used for testing",
    };

    // Act
    const result = recipeRepository.create(newRecipe);

    // Assert
    expect(result).toEqual(newRecipe);
    expect(recipeRepository.getById(999)).toEqual(newRecipe);
  });

  it("updates a recipe", () => {
    // Arrange
    const originalRecipe = initialRecipes[0];
    const updatedRecipe = {
      ...originalRecipe,
      description: "Updated description",
    };

    // Act
    const result = recipeRepository.update(
      originalRecipe.id,
      updatedRecipe
    );

    // Assert
    expect(result).toEqual(updatedRecipe);
    expect(
      recipeRepository.getById(originalRecipe.id)
    ).toEqual(updatedRecipe);
  });

  it("deletes a recipe", () => {
    // Arrange
    const recipeToDelete = initialRecipes[0];

    // Act
    const result = recipeRepository.delete(recipeToDelete.id);

    // Assert
    expect(result).toBe(true);
    expect(
      recipeRepository.getById(recipeToDelete.id)
    ).toBeUndefined();
  });

  // Service tests

  it("gets all recipes through the service", () => {
    // Arrange
    const expectedRecipes = initialRecipes;

    // Act
    const result = recipeService.getAllRecipes();

    // Assert
    expect(result).toEqual(expectedRecipes);
  });

  it("adds a recipe with trimmed values", () => {
    // Arrange
    const newRecipe = {
      id: 999,
      name: "  Test Recipe  ",
      description: "  A test description  ",
    };

    const expectedRecipe = {
      id: 999,
      name: "Test Recipe",
      description: "A test description",
    };

    // Act
    const result = recipeService.addRecipe(newRecipe);

    // Assert
    expect(result).toEqual(expectedRecipe);
    expect(recipeRepository.getById(999)).toEqual(expectedRecipe);
  });

  it("rejects a recipe with an empty name", () => {
    // Arrange
    const invalidRecipe = {
      id: 999,
      name: "   ",
      description: "A test description",
    };

    // Act
    const action = () => recipeService.addRecipe(invalidRecipe);

    // Assert
    expect(action).toThrow("Recipe name is required.");
  });

  it("updates a recipe through the service", () => {
    // Arrange
    const originalRecipe = initialRecipes[0];
    const updatedRecipe = {
      ...originalRecipe,
      name: "  Updated Name  ",
      description: "  Updated Description  ",
    };

    const expectedRecipe = {
      ...originalRecipe,
      name: "Updated Name",
      description: "Updated Description",
    };

    // Act
    const result = recipeService.updateRecipe(
      originalRecipe.id,
      updatedRecipe
    );

    // Assert
    expect(result).toEqual(expectedRecipe);
  });

  it("deletes a recipe through the service", () => {
    // Arrange
    const recipeToDelete = initialRecipes[0];

    // Act
    const result = recipeService.deleteRecipe(recipeToDelete.id);

    // Assert
    expect(result).toBe(true);
    expect(
      recipeRepository.getById(recipeToDelete.id)
    ).toBeUndefined();
  });
});
