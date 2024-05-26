import { z } from 'zod';

export const commentSchema = z.string().min(3, 'Comment must contain at least 3 characters').max(500, 'Comment must not exceed 500 characters');
