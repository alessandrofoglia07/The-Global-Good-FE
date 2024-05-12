import { z } from 'zod';

export const UsernameSchema = z.string()
    .min(3, 'Username must be at least 3 characters long.')
    .refine((value) => /^[\p{L}\p{M}\p{S}\p{N}\p{P}]+$/u.test(value), {
        message: 'Username can only contain letters, numbers, and symbols.',
    });

export const EmailSchema = z.string().email().min(1, 'Email is required.');

export const PasswordSchema = z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .refine((val) => {
        return val.match(/[a-z]/);
    }, 'Password must contain at least one lowercase letter.')
    .refine((val) => {
        return val.match(/[0-9]/);
    }, 'Password must contain at least one number.')
    .refine((val) => {
        return val.match(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/);
    }, 'Password must contain at least one special character.');
