export interface Ingredient {
  name: string;
  description: string;
}

export interface RecipeIngredients {
  recipeName: string;
  ingredients: Ingredient[];
}

export const recipeIngredients: RecipeIngredients[] = [
  {
    recipeName: "Paneer Tikka",
    ingredients: [
      {
        name: "Paneer",
        description:
          "Indian cottage cheese used as the main ingredient.",
      },
      {
        name: "Yogurt",
        description:
          "Used to marinate the paneer and make it soft and flavourful.",
      },
      {
        name: "Bell Peppers",
        description:
          "Add colour, flavour, and crunch to the dish.",
      },
      {
        name: "Spices",
        description:
          "Add flavour, aroma, and seasoning.",
      },
    ],
  },

  {
    recipeName: "Chole Bhature",
    ingredients: [
      {
        name: "Chickpeas",
        description:
          "The main ingredient used to prepare the spicy curry.",
      },
      {
        name: "Flour",
        description:
          "Used to prepare the dough for the bhature.",
      },
      {
        name: "Onion",
        description:
          "Adds flavour and helps create the curry base.",
      },
      {
        name: "Tomato",
        description:
          "Helps create the curry sauce and adds a slightly tangy flavour.",
      },
      {
        name: "Spices",
        description:
          "Give the chickpea curry its traditional flavour.",
      },
    ],
  },

  {
    recipeName: "Margherita Pizza",
    ingredients: [
      {
        name: "Pizza Dough",
        description:
          "Forms the base of the pizza.",
      },
      {
        name: "Tomato Sauce",
        description:
          "Adds flavour and moisture to the pizza.",
      },
      {
        name: "Mozzarella Cheese",
        description:
          "Melts over the pizza and gives it a creamy texture.",
      },
      {
        name: "Basil",
        description:
          "Adds a fresh flavour and pleasant aroma.",
      },
    ],
  },

  {
    recipeName: "Vegetable Fried Rice",
    ingredients: [
      {
        name: "Rice",
        description:
          "Forms the main base of the dish.",
      },
      {
        name: "Carrots",
        description:
          "Add sweetness, colour, and texture.",
      },
      {
        name: "Green Peas",
        description:
          "Add colour and a slightly sweet flavour.",
      },
      {
        name: "Soy Sauce",
        description:
          "Adds a savoury flavour and colour to the rice.",
      },
    ],
  },

  {
    recipeName: "Aloo Gobi",
    ingredients: [
      {
        name: "Potatoes",
        description:
          "Provide a soft texture and make the dish filling.",
      },
      {
        name: "Cauliflower",
        description:
          "The main vegetable that gives the dish its name and texture.",
      },
      {
        name: "Onion",
        description:
          "Adds flavour and helps create the base of the dish.",
      },
      {
        name: "Tomato",
        description:
          "Adds moisture and a slightly tangy flavour.",
      },
      {
        name: "Turmeric",
        description:
          "Adds colour and a mild earthy flavour.",
      },
    ],
  },

  {
    recipeName: "Chicken Noodles",
    ingredients: [
      {
        name: "Noodles",
        description:
          "Form the main base of the dish.",
      },
      {
        name: "Chicken",
        description:
          "Provides protein and adds flavour to the noodles.",
      },
      {
        name: "Carrots",
        description:
          "Add colour, sweetness, and crunch.",
      },
      {
        name: "Bell Peppers",
        description:
          "Add colour and a fresh, crunchy texture.",
      },
      {
        name: "Soy Sauce",
        description:
          "Adds a savoury flavour to the noodles.",
      },
    ],
  },

  {
    recipeName: "Vegetable Biryani",
    ingredients: [
      {
        name: "Basmati Rice",
        description:
          "Long-grain rice that forms the main base of the biryani.",
      },
      {
        name: "Mixed Vegetables",
        description:
          "Add colour, nutrients, and different textures.",
      },
      {
        name: "Onion",
        description:
          "Adds sweetness and flavour to the dish.",
      },
      {
        name: "Yogurt",
        description:
          "Adds creaminess and helps balance the spices.",
      },
      {
        name: "Biryani Spices",
        description:
          "Give the rice its traditional aroma and flavour.",
      },
    ],
  },

  {
    recipeName: "Masala Dosa",
    ingredients: [
      {
        name: "Rice",
        description:
          "Used to prepare the fermented dosa batter.",
      },
      {
        name: "Urad Dal",
        description:
          "Helps create the soft texture and fermentation of the batter.",
      },
      {
        name: "Potatoes",
        description:
          "Used to prepare the spiced filling.",
      },
      {
        name: "Onion",
        description:
          "Adds flavour to the potato filling.",
      },
      {
        name: "Spices",
        description:
          "Add flavour and seasoning to the filling.",
      },
    ],
  },

  {
    recipeName: "Tacos",
    ingredients: [
      {
        name: "Tortillas",
        description:
          "Form the outer shell or base of the tacos.",
      },
      {
        name: "Beans",
        description:
          "Provide protein and make the tacos filling.",
      },
      {
        name: "Lettuce",
        description:
          "Adds freshness and crunch.",
      },
      {
        name: "Tomato",
        description:
          "Adds moisture, colour, and a fresh flavour.",
      },
      {
        name: "Cheese",
        description:
          "Adds a creamy and savoury flavour.",
      },
    ],
  },

  {
    recipeName: "Palak Paneer",
    ingredients: [
      {
        name: "Paneer",
        description:
          "Indian cottage cheese that provides the main protein and creamy texture.",
      },
      {
        name: "Spinach",
        description:
          "Forms the main base of the creamy green gravy.",
      },
      {
        name: "Onion",
        description:
          "Adds flavour and helps create the base of the gravy.",
      },
      {
        name: "Tomato",
        description:
          "Adds flavour, moisture, and a slight tanginess to the gravy.",
      },
      {
        name: "Spices",
        description:
          "Add aroma, flavour, and seasoning to the dish.",
      },
    ],
  },
];