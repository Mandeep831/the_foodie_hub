
import {
  beforeEach,
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { reviewRepository } from "../repositories/reviewRepository";
import { reviewService } from "../services/reviewService";

const fetchMock = vi.fn();

const apiReview = {
  id: 1,
  recipeId: 1,
  reviewer: "Aman",
  rating: 5,
  comment: "Very tasty!",
  recipe: {
    id: 1,
    name: "Paneer Tikka",
  },
};

const reviewInput = {
  recipeId: 1,
  reviewer: "Aman",
  rating: 5,
  comment: "Very tasty!",
};

const expectedReview = {
  id: 1,
  recipeName: "Paneer Tikka",
  reviewer: "Aman",
  rating: 5,
  comment: "Very tasty!",
};

describe("Review Repository and Service", () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("gets all reviews", async () => {
    // Arrange
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify([apiReview]))
    );

    // Act
    const reviews = await reviewRepository.getAll();

    // Assert
    expect(reviews).toEqual([expectedReview]);
  });

  it("gets a review by ID", async () => {
    // Arrange
    fetchMock
      .mockResolvedValueOnce(
        new Response(JSON.stringify(apiReview))
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify([apiReview]))
      );

    // Act
    const review = await reviewRepository.getById(1);

    // Assert
    expect(review).toEqual(expectedReview);
  });

  it("creates a review", async () => {
    // Arrange
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify(apiReview), {
        status: 201,
      })
    );

    // Act
    const created = await reviewRepository.create(
      reviewInput,
      "Paneer Tikka"
    );

    // Assert
    expect(created).toEqual(expectedReview);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/reviews"),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(reviewInput),
      })
    );
  });

  it("updates a review", async () => {
    // Arrange
    const updatedInput = {
      ...reviewInput,
      rating: 4,
    };

    fetchMock.mockResolvedValueOnce(
      new Response(
        JSON.stringify({ ...apiReview, rating: 4 })
      )
    );

    // Act
    const updated = await reviewRepository.update(
      1,
      updatedInput,
      "Paneer Tikka"
    );

    // Assert
    expect(updated?.rating).toBe(4);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/reviews/1"),
      expect.objectContaining({
        method: "PUT",
      })
    );
  });

  it("deletes a review", async () => {
    // Arrange
    fetchMock.mockResolvedValueOnce(
      new Response(null, { status: 204 })
    );

    // Act
    const deleted = await reviewRepository.delete(1);

    // Assert
    expect(deleted).toBe(true);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/reviews/1"),
      expect.objectContaining({
        method: "DELETE",
      })
    );
  });

  it("gets all reviews through the service", async () => {
    // Arrange
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify([apiReview]))
    );

    // Act
    const reviews = await reviewService.getAllReviews();

    // Assert
    expect(reviews).toEqual([expectedReview]);
  });

  it("adds a review with trimmed values", async () => {
    // Arrange
    const input = {
      ...reviewInput,
      reviewer: "  Aman  ",
      comment: "  Very tasty!  ",
    };

    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify(apiReview), {
        status: 201,
      })
    );

    // Act
    const created = await reviewService.addReview(
      input,
      "Paneer Tikka"
    );

    // Assert
    expect(created.reviewer).toBe("Aman");
    expect(created.comment).toBe("Very tasty!");
    expect(fetchMock).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: JSON.stringify(reviewInput),
      })
    );
  });

  it("rejects a review with invalid rating", async () => {
    // Arrange
    const invalidReview = {
      ...reviewInput,
      rating: 6,
    };

    // Act and Assert
    await expect(
      reviewService.addReview(
        invalidReview,
        "Paneer Tikka"
      )
    ).rejects.toThrow(
      "Rating must be between 1 and 5."
    );

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("updates a review through the service", async () => {
    // Arrange
    const updatedInput = {
      ...reviewInput,
      comment: "Updated review",
    };

    fetchMock.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          ...apiReview,
          comment: "Updated review",
        })
      )
    );

    // Act
    const updated = await reviewService.updateReview(
      1,
      updatedInput,
      "Paneer Tikka"
    );

    // Assert
    expect(updated?.comment).toBe("Updated review");
  });

  it("deletes a review through the service", async () => {
    // Arrange
    fetchMock.mockResolvedValueOnce(
      new Response(null, { status: 204 })
    );

    // Act
    const deleted = await reviewService.deleteReview(1);

    // Assert
    expect(deleted).toBe(true);
  });
});
