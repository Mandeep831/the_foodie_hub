# FoodieHub Architecture

## useIngredients Hook

### What does it do?

The `useIngredients` hook provides ingredient data and actions for components. It manages the component state for ingredient data and connects the components to the ingredient service.

### How was the logic separated?

The hook handles state and presentation-related logic. It does not directly access the repository. Data operations are passed to the ingredient service, which keeps data access separate from the component.

### Where is it used?

The `useIngredients` hook is used by `IngredientsList` and `RecipeList`.

## Ingredient Service

### What does it do?

The `ingredientService` provides reusable business operations for getting, adding, updating, and removing recipe ingredients.

### How was the logic separated?

The service keeps ingredient business logic separate from the components and does not manage component state. Repository operations are handled by the ingredient repository.

### Where is it used?

The ingredient service is used by the `useIngredients` hook.

## Ingredient Repository

### What does it do?

The `ingredientRepository` manages recipe ingredient data and provides CRUD methods for getting, creating, updating, and deleting ingredient records.

### How was the logic separated?

The repository is responsible for data access. It uses the test data from `src/data/ingredients.ts` and keeps data access separate from the service and components.

### Where is it used?

The ingredient repository is used by the `ingredientService`.