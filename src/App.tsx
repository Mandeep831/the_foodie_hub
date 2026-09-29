import { useState } from "react";
import "./App.css";
import {
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";

import RecipeList from "./components/recipeList/RecipeList";
import IngredientsList from "./components/ingredients/IngredientsList";
import Reviews from "./components/Reviews/review";

function App() {
  const [activityCount, setActivityCount] = useState(0);

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
            element={<Navigate to="/recipes" replace />}
          />

          <Route
            path="/recipes"
            element={
              <RecipeList
                activityCount={activityCount}
                setActivityCount={setActivityCount}
              />
            }
          />

          <Route
            path="/ingredients"
            element={
              <IngredientsList
                activityCount={activityCount}
                setActivityCount={setActivityCount}
              />
            }
          />

          <Route
            path="/reviews"
            element={
              <Reviews
                activityCount={activityCount}
                setActivityCount={setActivityCount}
              />
            }
          />
        </Routes>
      </main>

      <footer>
        <p>FoodieHub Team</p>
        <p>
          Mandeep Kaur | Prachi Dhamija | Gagandeep Singh
        </p>
      </footer>
    </>
  );
}

export default App;