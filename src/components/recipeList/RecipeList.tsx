import { useIngredients } from "../../hooks/useIngredients";

function RecipeList() {
  const { ingredientsData } = useIngredients();

  return (
    <section className="recipe-list">
      <h2>Recipes</h2>

      <ul>
        {ingredientsData.map((recipe) => (
          <li key={recipe.recipeName}>
            {recipe.recipeName}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RecipeList;