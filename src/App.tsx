import "./App.css";
import { Routes, Route, Navigate, NavLink } from "react-router-dom";
import RecipeList from "./components/recipeList/RecipeList";
import IngredientsList from "./components/ingredients/IngredientsList";
import Review from "./components/Reviews/review";

function App() {
  return (
    <>
      <header>
        <h1>FoodieHub</h1>
        <nav>
          <NavLink to="/recipes">Recipes</NavLink>
          <NavLink to="/ingredients">Ingredients</NavLink>
          <NavLink to="/reviews">Reviews</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/recipes" replace />} />
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/ingredients" element={<IngredientsList />} />
          <Route path="/reviews" element={<Review />} />
        </Routes>
      </main>

      <footer>
        <p>FoodieHub Team</p>
        <p>Mandeep Kaur | Prachi Dhamija | Gagandeep Singh</p>
      </footer>
    </>
  );
}

export default App;