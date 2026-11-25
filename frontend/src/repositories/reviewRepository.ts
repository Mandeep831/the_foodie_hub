
import type { Review } from "../data/reviews";

const RECIPE_API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api/recipes";

const API_URL = RECIPE_API_URL.replace(
  /\/recipes\/?$/,
  "/reviews"
);

interface ApiReview {
  id: number;
  recipeId: number;
  reviewer: string;
  rating: number;
  comment: string;
  recipe?: {
    id: number;
    name: string;
  };
}

export type ReviewInput = {
  recipeId: number;
  reviewer: string;
  rating: number;
  comment: string;
};

function mapReview(
  review: ApiReview,
  recipeName = ""
): Review {
  return {
    id: review.id,
    recipeName: review.recipe?.name ?? recipeName,
    reviewer: review.reviewer,
    rating: review.rating,
    comment: review.comment,
  };
}

export const reviewRepository = {
  async getAll(): Promise<Review[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }

    const reviews: ApiReview[] = await response.json();

    return reviews.map((review) => mapReview(review));
  },

  async getById(id: number): Promise<Review | undefined> {
    const response = await fetch(`${API_URL}/${id}`);

    if (response.status === 404) return undefined;

    if (!response.ok) {
      throw new Error("Failed to fetch review");
    }

    const reviews = await this.getAll();
    return reviews.find((review) => review.id === id);
  },

  async create(
    review: ReviewInput,
    recipeName: string
  ): Promise<Review> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    });

    if (!response.ok) {
      throw new Error("Failed to create review");
    }

    return mapReview(await response.json(), recipeName);
  },

  async update(
    id: number,
    review: ReviewInput,
    recipeName: string
  ): Promise<Review | undefined> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    });

    if (response.status === 404) return undefined;

    if (!response.ok) {
      throw new Error("Failed to update review");
    }

    return mapReview(await response.json(), recipeName);
  },

  async delete(id: number): Promise<boolean> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (response.status === 404) return false;

    if (!response.ok) {
      throw new Error("Failed to delete review");
    }

    return true;
  },
};
