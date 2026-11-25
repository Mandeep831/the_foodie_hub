import { prisma } from "../src/prisma.js";

const recipes = [
  {
    id: 1,
    name: "Paneer Tikka",
    description: "Grilled Indian cottage cheese with spices and vegetables.",
  },
  {
    id: 2,
    name: "Chole Bhature",
    description: "Spicy chickpeas served with fried bread.",
  },
  {
    id: 3,
    name: "Margherita Pizza",
    description: "Pizza topped with tomato sauce, mozzarella, and basil.",
  },
  {
    id: 4,
    name: "Vegetable Fried Rice",
    description: "Rice stir-fried with fresh vegetables and savoury seasonings.",
  },
  {
    id: 5,
    name: "Aloo Gobi",
    description: "A traditional Indian dish made with potatoes, cauliflower, and aromatic spices.",
  },
  {
    id: 6,
    name: "Chicken Noodles",
    description: "Stir-fried noodles cooked with chicken and fresh vegetables.",
  },
  {
    id: 7,
    name: "Vegetable Biryani",
    description: "Fragrant basmati rice cooked with vegetables and aromatic spices.",
  },
  {
    id: 8,
    name: "Masala Dosa",
    description: "Crispy fermented rice crepe filled with spiced potatoes.",
  },
  {
    id: 9,
    name: "Tacos",
    description: "Soft or crispy tortillas filled with vegetables, beans, and toppings.",
  },
  {
    id: 10,
    name: "Palak Paneer",
    description: "Indian cottage cheese cooked in a creamy spinach gravy.",
  },
];

const ingredientsByRecipe = [
  {
    recipeName: "Paneer Tikka",
    ingredients: [
      ["Paneer", "Indian cottage cheese used as the main ingredient."],
      ["Yogurt", "Used to marinate the paneer and make it soft and flavourful."],
      ["Bell Peppers", "Add colour, flavour, and crunch to the dish."],
      ["Spices", "Add flavour, aroma, and seasoning."],
    ],
  },
  {
    recipeName: "Chole Bhature",
    ingredients: [
      ["Chickpeas", "The main ingredient used to prepare the spicy curry."],
      ["Flour", "Used to prepare the dough for the bhature."],
      ["Onion", "Adds flavour and helps create the curry base."],
      ["Tomato", "Helps create the curry sauce and adds a slightly tangy flavour."],
      ["Spices", "Give the chickpea curry its traditional flavour."],
    ],
  },
  {
    recipeName: "Margherita Pizza",
    ingredients: [
      ["Pizza Dough", "Forms the base of the pizza."],
      ["Tomato Sauce", "Adds flavour and moisture to the pizza."],
      ["Mozzarella Cheese", "Melts over the pizza and gives it a creamy texture."],
      ["Basil", "Adds a fresh flavour and pleasant aroma."],
    ],
  },
  {
    recipeName: "Vegetable Fried Rice",
    ingredients: [
      ["Rice", "Forms the main base of the dish."],
      ["Carrots", "Add sweetness, colour, and texture."],
      ["Green Peas", "Add colour and a slightly sweet flavour."],
      ["Soy Sauce", "Adds a savoury flavour and colour to the rice."],
    ],
  },
  {
    recipeName: "Aloo Gobi",
    ingredients: [
      ["Potatoes", "Provide a soft texture and make the dish filling."],
      ["Cauliflower", "The main vegetable that gives the dish its name and texture."],
      ["Onion", "Adds flavour and helps create the base of the dish."],
      ["Tomato", "Adds moisture and a slightly tangy flavour."],
      ["Turmeric", "Adds colour and a mild earthy flavour."],
    ],
  },
  {
    recipeName: "Chicken Noodles",
    ingredients: [
      ["Noodles", "Form the main base of the dish."],
      ["Chicken", "Provides protein and adds flavour to the noodles."],
      ["Carrots", "Add colour, sweetness, and crunch."],
      ["Bell Peppers", "Add colour and a fresh, crunchy texture."],
      ["Soy Sauce", "Adds a savoury flavour to the noodles."],
    ],
  },
  {
    recipeName: "Vegetable Biryani",
    ingredients: [
      ["Basmati Rice", "Long-grain rice that forms the main base of the biryani."],
      ["Mixed Vegetables", "Add colour, nutrients, and different textures."],
      ["Onion", "Adds sweetness and flavour to the dish."],
      ["Yogurt", "Adds creaminess and helps balance the spices."],
      ["Biryani Spices", "Give the rice its traditional aroma and flavour."],
    ],
  },
  {
    recipeName: "Masala Dosa",
    ingredients: [
      ["Rice", "Used to prepare the fermented dosa batter."],
      ["Urad Dal", "Helps create the soft texture and fermentation of the batter."],
      ["Potatoes", "Used to prepare the spiced filling."],
      ["Onion", "Adds flavour to the potato filling."],
      ["Spices", "Add flavour and seasoning to the filling."],
    ],
  },
  {
    recipeName: "Tacos",
    ingredients: [
      ["Tortillas", "Form the outer shell or base of the tacos."],
      ["Beans", "Provide protein and make the tacos filling."],
      ["Lettuce", "Adds freshness and crunch."],
      ["Tomato", "Adds moisture, colour, and a fresh flavour."],
      ["Cheese", "Adds a creamy and savoury flavour."],
    ],
  },
  {
    recipeName: "Palak Paneer",
    ingredients: [
      ["Paneer", "Indian cottage cheese that provides the main protein and creamy texture."],
      ["Spinach", "Forms the main base of the creamy green gravy."],
      ["Onion", "Adds flavour and helps create the base of the gravy."],
      ["Tomato", "Adds flavour, moisture, and a slight tanginess to the gravy."],
      ["Spices", "Add aroma, flavour, and seasoning to the dish."],
    ],
  },
];

async function main() {
  // Keep existing recipes and update their details.
  for (const recipe of recipes) {
    await prisma.recipe.upsert({
      where: { id: recipe.id },
      update: {
        name: recipe.name,
        description: recipe.description,
      },
      create: recipe,
    });
  }

  // Add ingredients and connect them to their recipes.
  for (const recipeData of ingredientsByRecipe) {
    const recipe = await prisma.recipe.findFirst({
      where: { name: recipeData.recipeName },
    });

    if (!recipe) {
      throw new Error(`Recipe not found: ${recipeData.recipeName}`);
    }

    for (const [name, description] of recipeData.ingredients) {
      let ingredient = await prisma.ingredient.findFirst({
        where: { name, description },
      });

      if (!ingredient) {
        ingredient = await prisma.ingredient.create({
          data: { name, description },
        });
      }

      await prisma.recipeIngredient.upsert({
        where: {
          recipeId_ingredientId: {
            recipeId: recipe.id,
            ingredientId: ingredient.id,
          },
        },
        update: {},
        create: {
          recipeId: recipe.id,
          ingredientId: ingredient.id,
        },
      });
    }
  }

  console.log("Recipes and ingredients seeded successfully!");
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
