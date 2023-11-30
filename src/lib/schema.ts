import { z } from 'zod';

export const profileSchema = z.object({
    first_name: z.string().min(1).trim(),
    last_name: z.string().min(1).trim(),
    website: z.string().url().nullable(),
    affiliation: z.string().nullable(),
}).required({
    first_name: true,
    last_name: true,
});

export const submissionSchema = z.object({
    abstract: z.string().trim(),
    title: z.string().min(1).trim(),
    first_name: z.string().min(1).trim(),
    last_name: z.string().min(1).trim(),
    website: z.string().url().nullable(),
    affiliation: z.string().nullable(),
}).required({
    abstract: true,
    title: true,
    first_name: true,
    last_name: true,
});
