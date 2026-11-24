
import type { Request, Response } from "express";
import * as reviewService from "../services/reviewService.js";

export const getAllReviews = async (
  req: Request,
  res: Response
) => {
  try {
    const reviews = await reviewService.getAllReviews();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};

export const getReviewById = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const review = await reviewService.getReviewById(id);

    if (!review) {
      res.status(404).json({ message: "Review not found" });
      return;
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch review" });
  }
};

export const createReview = async (
  req: Request,
  res: Response
) => {
  try {
    const { recipeId, reviewer, rating, comment } = req.body;

    const review = await reviewService.createReview(
      recipeId,
      reviewer,
      rating,
      comment
    );

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Failed to create review" });
  }
};

export const updateReview = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const { recipeId, reviewer, rating, comment } = req.body;

    const existingReview = await reviewService.getReviewById(id);

    if (!existingReview) {
      res.status(404).json({ message: "Review not found" });
      return;
    }

    const review = await reviewService.updateReview(
      id,
      recipeId,
      reviewer,
      rating,
      comment
    );

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Failed to update review" });
  }
};

export const deleteReview = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const review = await reviewService.getReviewById(id);

    if (!review) {
      res.status(404).json({ message: "Review not found" });
      return;
    }

    await reviewService.deleteReview(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete review" });
  }
};
