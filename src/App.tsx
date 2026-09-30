import { useState } from "react";
import "./App.css";

import {
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";

import RecipeList, {
  initialRecipes,
  type Recipe,
} from "./components/recipeList/RecipeList";

import IngredientsList, {
  recipeIngredients,
  type RecipeIngredients,
} from "./components/ingredients/IngredientsList";

import Reviews, {
  recipeReviews,
  type Review,
} from "./components/Reviews/review";

function App() {
  // Shared Recipes state
  const [recipes, setRecipes] =
    useState<Recipe[]>(initialRecipes);

  // Shared Ingredients state
  const [ingredientsData, setIngredientsData] =
    useState<RecipeIngredients[]>(
      recipeIngredients
    );

  // Shared Reviews state
  const [reviews, setReviews] =
    useState<Review[]>(recipeReviews);

  // Shared Activity state
  const [activityCount, setActivityCount] =
    useState(0);

  return (
    <>
      <header>
        <h1>FoodieHub</h1>

        <nav>
          <Link to="/recipes">Recipes</Link>
          {" | "}
          <Link to="/ingredients">
            Ingredients
          </Link>
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
                setRecipes={setRecipes}
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
                ingredientsData={
                  ingredientsData
                }
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
        </Routes>
      </main>

      <footer>
        <p>FoodieHub Team</p>

        <p>
          Mandeep Kaur | Prachi Dhamija |
          Gagandeep Singh
        </p>
      </footer>
    </>
  );
}

export default App;