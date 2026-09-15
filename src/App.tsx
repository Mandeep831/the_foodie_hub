import "./App.css";
import RecipeList from "./components/recipeList/RecipeList";


function App() {
  return (
    <>
      <header>
        <h1>FoodieHub</h1>
      </header>

      <main>
        <RecipeList />
      </main>

      <footer>
        <p>FoodieHub Team</p>
        <p>Mandeep Kaur | Prachi Dhamija | Gagandeep Singh</p>
      </footer>
    </>
  );
}

export default App;