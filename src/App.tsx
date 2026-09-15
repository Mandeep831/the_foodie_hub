import RecipeList from "./components/recipeList/RecipeList";
import IngredientsList from "./components/ingredients/IngredientsList";
import Reviews from "./components/Reviews/review";

function App() {
  return (
    <>
      <header>
        <h1>FoodieHub</h1>
      </header>

      <main>
        <RecipeList />
        <IngredientsList />
        <Reviews />
      </main>

      <footer>
        <p>FoodieHub Team</p>
        <p>Mandeep Kaur | Prachi Dhamija | Gagandeep Singh</p>
      </footer>
    </>
  );
}

export default App;