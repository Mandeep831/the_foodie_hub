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

async function main() {
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

  console.log("10 recipes added successfully!");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
