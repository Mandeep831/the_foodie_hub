
import { prisma } from "../src/prisma.js";
import { recipeReviews } from "../../frontend/src/data/reviews.js";

async function main() {
  let added = 0;
  let skipped = 0;

  for (const review of recipeReviews) {
    const recipe = await prisma.recipe.findFirst({
      where: {
        name: review.recipeName,
      },
    });

    if (!recipe) {
      console.log(`Recipe not found: ${review.recipeName}`);
      skipped++;
      continue;
    }

    const existingReview = await prisma.review.findFirst({
      where: {
        recipeId: recipe.id,
        reviewer: review.reviewer,
        rating: review.rating,
        comment: review.comment,
      },
    });

    if (existingReview) {
      skipped++;
      continue;
    }

    await prisma.review.create({
      data: {
        recipeId: recipe.id,
        reviewer: review.reviewer,
        rating: review.rating,
        comment: review.comment,
      },
    });

    added++;
  }

  console.log(`${added} reviews added successfully!`);
  console.log(`${skipped} reviews skipped.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
