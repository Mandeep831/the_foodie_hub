import { Routes, Route, Navigate, Link } from "react-router-dom";
import RecipeList from "./components/recipeList/RecipeList";
import IngredientsList from "./components/ingredients/IngredientsList";
import "./App.css";

function App() {
  return (
    <>
      <header>
        <h1>FoodieHub</h1>

        <nav>
          <Link to="/recipes">Recipes</Link>{" | "}
          <Link to="/ingredients">Ingredients</Link>
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
            element={<RecipeList />}
          />

          <Route
            path="/ingredients"
            element={<IngredientsList />}
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