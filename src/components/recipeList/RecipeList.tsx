import { useState } from "react";
import AddRecipeForm from "./AddRecipeForm";

export interface Recipe {
  id: number;
  name: string;
  description: string;
}

export const initialRecipes: Recipe[] = [
  {
    id: 1,
    name: "Paneer Tikka",
    description:
      "Grilled Indian cottage cheese with spices and vegetables.",
  },
  {
    id: 2,
    name: "Chole Bhature",
    description:
      "Spicy chickpeas served with fried bread.",
  },
  {
    id: 3,
    name: "Margherita Pizza",
    description:
      "Pizza topped with tomato sauce, mozzarella, and basil.",
  },
  {
    id: 4,
    name: "Vegetable Fried Rice",
    description:
      "Rice stir-fried with fresh vegetables and savoury seasonings.",
  },
  {
    id: 5,
    name: "Aloo Gobi",
    description:
      "A traditional Indian dish made with potatoes, cauliflower, and aromatic spices.",
  },
  {
    id: 6,
    name: "Chicken Noodles",
    description:
      "Stir-fried noodles cooked with chicken and fresh vegetables.",
  },
  {
    id: 7,
    name: "Vegetable Biryani",
    description:
      "Fragrant basmati rice cooked with vegetables and aromatic spices.",
  },
  {
    id: 8,
    name: "Masala Dosa",
    description:
      "Crispy fermented rice crepe filled with spiced potatoes.",
  },
  {
    id: 9,
    name: "Tacos",
    description:
      "Soft or crispy tortillas filled with vegetables, beans, and toppings.",
  },
];

interface Ingredient {
  name: string;
  description: string;
}

interface RecipeIngredients {
  recipeName: string;
  ingredients: Ingredient[];
}

interface Review {
  id: number;
  recipeName: string;
  reviewer: string;
  rating: number;
  comment: string;
}

interface RecipeListProps {
  recipes: Recipe[];

  setRecipes: React.Dispatch<
    React.SetStateAction<Recipe[]>
  >;

  ingredientsData: RecipeIngredients[];

  setIngredientsData: React.Dispatch<
    React.SetStateAction<RecipeIngredients[]>
  >;

  reviews: Review[];

  activityCount: number;

  setActivityCount: React.Dispatch<
    React.SetStateAction<number>
  >;
}

function RecipeList({
  recipes,
  setRecipes,
  ingredientsData,
  setIngredientsData,
  reviews,
  activityCount,
  setActivityCount,
}: RecipeListProps) {
  const [selectedRecipe, setSelectedRecipe] =
    useState<number | null>(null);

  return (
    <section className="recipe-list">
      <h2>Popular Recipes</h2>

      <p>Shared Activity Count: {activityCount}</p>

      <button
        type="button"
        onClick={() =>
          setActivityCount(activityCount + 1)
        }
      >
        Increase Activity
      </button>

      <AddRecipeForm
        recipes={recipes}
        setRecipes={setRecipes}
        ingredientsData={ingredientsData}
        setIngredientsData={setIngredientsData}
      />

      <div className="recipe-cards">
        {recipes.map((recipe) => {
          const selectedIngredients =
            ingredientsData.find(
              (item) =>
                item.recipeName === recipe.name
            );

          const selectedReviews = reviews.filter(
            (review) =>
              review.recipeName === recipe.name
          );

          const isSelected =
            selectedRecipe === recipe.id;

          return (
            <article
              className="recipe-card"
              key={recipe.id}
            >
              <div className="recipe-image">
                <span>🍽️</span>
              </div>

              <div className="recipe-content">
                <h3>{recipe.name}</h3>

                <p>{recipe.description}</p>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedRecipe(
                      isSelected
                        ? null
                        : recipe.id
                    )
                  }
                >
                  {isSelected
                    ? "Hide Ingredients and Reviews"
                    : "View Ingredients"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setRecipes(
                      recipes.filter(
                        (item) =>
                          item.id !== recipe.id
                      )
                    )
                  }
                >
                  Remove Recipe
                </button>

                {isSelected && (
                  <div className="recipe-details">
                    <h4>Ingredients</h4>

                    {selectedIngredients &&
                    selectedIngredients.ingredients
                      .length > 0 ? (
                      <ul>
                        {selectedIngredients.ingredients.map(
                          (ingredient) => (
                            <li
                              key={ingredient.name}
                            >
                              <strong>
                                {ingredient.name}
                              </strong>

                              <p>
                                {
                                  ingredient.description
                                }
                              </p>
                            </li>
                          )
                        )}
                      </ul>
                    ) : (
                      <p>
                        No ingredients available
                        yet.
                      </p>
                    )}

                    <h4>Reviews</h4>

                    <div className="recipe-reviews">
                      {selectedReviews.length >
                      0 ? (
                        selectedReviews.map(
                          (review) => (
                            <div
                              className="recipe-review"
                              key={review.id}
                            >
                              <p>
                                <strong>
                                  {
                                    review.reviewer
                                  }
                                </strong>{" "}
                                —{" "}
                                {review.rating}/5
                              </p>

                              <p>
                                {review.comment}
                              </p>
                            </div>
                          )
                        )
                      ) : (
                        <p>
                          No reviews available yet.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default RecipeList;