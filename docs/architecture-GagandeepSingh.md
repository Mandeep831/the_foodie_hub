# FoodieHub — Sprint 3 Architecture

**Developer:** Gagandeep Singh  
**Resource:** Reviews

## Review Repository

**File:** `src/repositories/reviewRepository.ts`

The repository handles review data and provides CRUD methods to get, create, update, and delete reviews.

This logic belongs in the repository because it is responsible only for data access.

It is used by `reviewService.ts`.

## Review Service

**File:** `src/services/reviewService.ts`

The service contains the business logic for reviews. It validates reviewer names, comments, and ratings and removes extra spaces from input.

This logic belongs in the service because validation should be separate from the UI and data access.

It is used by `useReviews.ts`.

## useReviews Hook

**File:** `src/hooks/useReviews.ts`

The `useReviews` hook manages review state and provides:

- `reviews`
- `addReview`
- `removeReview`
- `updateReview`

This logic belongs in the hook because it manages React state.

It is used in `App.tsx`, and the review state and functions are passed to the Reviews component.

## Review Test Data

**File:** `src/data/reviews.ts`

This file contains the `Review` TypeScript interface and 18 predefined review objects.

The repository imports this data to initialize the review collection.

## Component Integration

**Files:**

- `src/components/Reviews/review.tsx`
- `src/components/Reviews/AddReviewForm.tsx`

The Reviews component displays review data and allows users to add and remove reviews.

The architecture follows:

`Component → Hook → Service → Repository → Test Data`

## Testing

**File:** `src/tests/review.test.ts`

The file contains 10 automated tests for the repository and service.

The tests follow the AAA pattern:

- Arrange
- Act
- Assert

All 10 tests passed successfully.