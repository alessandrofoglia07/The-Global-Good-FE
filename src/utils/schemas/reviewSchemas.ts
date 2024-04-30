import { z } from 'zod';

export const titleSchema = z.string().min(1, 'Title must contain at least 1 character(s)').max(50, 'Title must not exceed 50 characters');

export const contentSchema = z.string().min(3, 'Comment must contain at least 3 characters').max(500, 'Comment must not exceed 500 characters');

export const ratingSchema = z.number().int().min(1, "Rating must be a number between 1 and 5").max(5, "Rating must be a number between 1 and 5");

export const reviewSchema = z.object({
    title: titleSchema,
    text: contentSchema,
    rating: ratingSchema,
});