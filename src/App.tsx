import { useState } from "react";
import "./App.css";

import {
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";

import RecipeList from "./components/recipeList/RecipeList";
import { useRecipes } from "./hooks/useRecipes";

import IngredientsList, {
  type RecipeIngredients,
} from "./components/ingredients/IngredientsList";

import { recipeIngredients } from "./data/ingredients";

import Reviews, {
  recipeReviews,
  type Review,
} from "./components/Reviews/review";

function App() {
  const {
    recipes,
    addRecipe,
    removeRecipe,
    updateRecipe,
  } = useRecipes();

  const [ingredientsData, setIngredientsData] =
    useState<RecipeIngredients[]>(recipeIngredients);

  const [reviews, setReviews] =
    useState<Review[]>(recipeReviews);

  const [activityCount, setActivityCount] =
    useState(0);

  return (
    <>
      <header>
        <h1>FoodieHub</h1>

        <nav>
          <Link to="/recipes">Recipes</Link>
          {" | "}
          <Link to="/ingredients">Ingredients</Link>
          {" | "}
          <Link to="/reviews">Reviews</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to="/recipes"
                replace
              />
            }
          />

          <Route
            path="/recipes"
            element={
              <RecipeList
                recipes={recipes}
                addRecipe={addRecipe}
                removeRecipe={removeRecipe}
                updateRecipe={updateRecipe}
                ingredientsData={ingredientsData}
                setIngredientsData={
                  setIngredientsData
                }
                reviews={reviews}
                activityCount={activityCount}
                setActivityCount={
                  setActivityCount
                }
              />
            }
          />

          <Route
            path="/ingredients"
            element={
              <IngredientsList
                ingredientsData={ingredientsData}
                setIngredientsData={
                  setIngredientsData
                }
                activityCount={activityCount}
                setActivityCount={
                  setActivityCount
                }
              />
            }
          />

          <Route
            path="/reviews"
            element={
              <Reviews
                reviews={reviews}
                setReviews={setReviews}
                recipeNames={recipes.map(
                  (recipe) => recipe.name
                )}
                activityCount={activityCount}
                setActivityCount={
                  setActivityCount
                }
              />
            }
          />

          <Route
            path="*"
            element={
              <Navigate
                to="/recipes"
                replace
              />
            }
          />
        </Routes>
      </main>

      <footer>
        <p>FoodieHub</p>
      </footer>
    </>
  );
}

export default App;