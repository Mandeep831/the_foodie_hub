import {
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";

import { reviewRepository } from "../repositories/reviewRepository";
import { reviewService } from "../services/reviewService";
import { recipeReviews } from "../data/reviews";

describe("Review Repository and Service", () => {
  beforeEach(() => {
    // Arrange: reset repository before each test.
    reviewRepository.getAll().forEach((review) => {
      reviewRepository.delete(review.id);
    });

    recipeReviews.forEach((review) => {
      reviewRepository.create({ ...review });
    });
  });

  it("gets all reviews", () => {
    // Arrange
    const expectedCount = recipeReviews.length;

    // Act
    const reviews = reviewRepository.getAll();

    // Assert
    expect(reviews).toHaveLength(expectedCount);
  });

  it("gets a review by ID", () => {
    // Arrange
    const reviewId = 1;

    // Act
    const review =
      reviewRepository.getById(reviewId);

    // Assert
    expect(review).toBeDefined();
    expect(review?.reviewer).toBe("Aman");
  });

  it("creates a review", () => {
    // Arrange
    const newReview = {
      id: 100,
      recipeName: "Tacos",
      reviewer: "Jane",
      rating: 5,
      comment: "Very good",
    };

    // Act
    const created =
      reviewRepository.create(newReview);

    // Assert
    expect(created).toEqual(newReview);
    expect(
      reviewRepository.getById(100)
    ).toEqual(newReview);
  });

  it("updates a review", () => {
    // Arrange
    const updatedReview = {
      id: 1,
      recipeName: "Paneer Tikka",
      reviewer: "Aman",
      rating: 4,
      comment: "Updated review",
    };

    // Act
    const updated =
      reviewRepository.update(
        1,
        updatedReview
      );

    // Assert
    expect(updated).toEqual(updatedReview);
    expect(
      reviewRepository.getById(1)
    ).toEqual(updatedReview);
  });

  it("deletes a review", () => {
    // Arrange
    const reviewId = 1;

    // Act
    const deleted =
      reviewRepository.delete(reviewId);

    // Assert
    expect(deleted).toBe(true);
    expect(
      reviewRepository.getById(reviewId)
    ).toBeUndefined();
  });

  it("gets all reviews through the service", () => {
    // Arrange
    const expectedCount = recipeReviews.length;

    // Act
    const reviews =
      reviewService.getAllReviews();

    // Assert
    expect(reviews).toHaveLength(expectedCount);
  });

  it("adds a review with trimmed values", () => {
    // Arrange
    const review = {
      id: 200,
      recipeName: "Tacos",
      reviewer: "  Jane  ",
      rating: 5,
      comment: "  Great tacos  ",
    };

    // Act
    const created =
      reviewService.addReview(review);

    // Assert
    expect(created.reviewer).toBe("Jane");
    expect(created.comment).toBe(
      "Great tacos"
    );
  });

  it("rejects a review with invalid rating", () => {
    // Arrange
    const review = {
      id: 201,
      recipeName: "Tacos",
      reviewer: "Jane",
      rating: 6,
      comment: "Good",
    };

    // Act + Assert
    expect(() =>
      reviewService.addReview(review)
    ).toThrow(
      "Rating must be between 1 and 5."
    );
  });

  it("updates a review through the service", () => {
    // Arrange
    const updatedReview = {
      id: 2,
      recipeName: "Paneer Tikka",
      reviewer: "Simran",
      rating: 5,
      comment: "Updated and improved",
    };

    // Act
    const updated =
      reviewService.updateReview(
        2,
        updatedReview
      );

    // Assert
    expect(updated).toEqual(updatedReview);
    expect(
      reviewRepository.getById(2)
    ).toEqual(updatedReview);
  });

  it("deletes a review through the service", () => {
    // Arrange
    const reviewId = 3;

    // Act
    const deleted =
      reviewService.deleteReview(reviewId);

    // Assert
    expect(deleted).toBe(true);
    expect(
      reviewRepository.getById(reviewId)
    ).toBeUndefined();
  });
});