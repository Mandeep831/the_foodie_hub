
# FoodieHub — Sprint 3 Architecture Documentation

**Developer:** Mandeep Kaur  
**Resource:** Recipes  
**Project:** FoodieHub

## 1. Overview

This document describes the Recipes architecture implemented for Sprint 3. The implementation separates presentation logic, business logic, and data access using a custom React hook, a service, and a repository.

The architecture follows this flow:

`RecipeList.tsx → useRecipes.ts → recipeService.ts → recipeRepository.ts → recipes.ts`

## 2. Test Data

**File:** `src/data/recipes.ts`

This file defines the `Recipe` TypeScript interface and exports an array named `initialRecipes` containing at least 10 predefined recipe objects.

Each recipe contains an ID, name, and description.

**Purpose:** The predefined data provides consistent test data without requiring an external backend. The repository imports this array to initialize its recipe collection.

## 3. Repository

**File:** `src/repositories/recipeRepository.ts`

The repository manages access to recipe data. It provides the following CRUD methods:

- `getAll()` — retrieves all recipes.
- `getById(id)` — retrieves a recipe by its ID.
- `create(recipe)` — adds a recipe.
- `update(id, updatedRecipe)` — updates an existing recipe.
- `delete(id)` — deletes a recipe.

**Purpose:** Separating data access from the rest of the application makes the code easier to maintain and allows the data source to be replaced with a backend in a future module.

## 4. Service

**File:** `src/services/recipeService.ts`

The service contains recipe-related business logic. It provides methods to retrieve, add, update, and delete recipes.

It also validates recipe names and descriptions and trims unnecessary whitespace before saving recipes.

**Purpose:** Business rules remain separate from data access and presentation. This allows recipe logic to be reused by components and hooks.

## 5. Custom Hook

**File:** `src/hooks/useRecipes.ts`

The `useRecipes` hook manages recipe state using React's `useState` hook. It initializes recipes through the service and provides functions to add, update, and remove recipes.

**Purpose:** The hook consolidates reusable state-management logic, allowing components to use recipe functionality without duplicating that logic.

## 6. Component Integration

**File:** `src/components/recipeList/RecipeList.tsx`

The recipe list component displays recipes and provides the user interface for adding, updating, and removing them.

It receives recipe data and handler functions from the application, allowing it to display recipes and respond to user interactions.

**Purpose:** The component focuses on presentation, while business logic and data access are handled by the service and repository.

## 7. Automated Testing

**File:** `src/tests/recipeRepository.test.ts`

This file contains 10 automated tests covering the repository and service.

The tests verify retrieving recipes, retrieving a recipe by ID, creating recipes, updating recipes, deleting recipes, trimming input values, and rejecting a recipe with an empty name.

Each test follows the AAA pattern:

- **Arrange:** Prepare the test data.
- **Act:** Execute the method being tested.
- **Assert:** Verify the expected result.

All 10 tests passed during testing.

## 8. Separation of Concerns

| Layer | Responsibility |
|---|---|
| Component | Displays recipes and handles user interactions |
| Custom hook | Manages React state and reusable logic |
| Service | Applies recipe business rules and validation |
| Repository | Performs recipe data access and CRUD operations |
| Test data | Provides predefined recipe objects |

## 9. Future Improvements

The repository currently uses in-memory data initialized from predefined TypeScript objects. It can be adapted to use a backend in a future module while keeping component, hook, service, and repository responsibilities separated.
