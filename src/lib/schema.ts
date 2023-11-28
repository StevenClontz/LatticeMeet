import { z } from 'zod';

export const profileSchema = z.object({
    first_name: z.string().min(1).trim().nullable(),
    last_name: z.string().min(1).trim().nullable(),
    website: z.string().url().nullable(),
    affiliation: z.string().nullable(),
}).required({
    first_name: true,
    last_name: true,
});

export const submissionSchema = z.object({
    abstract: z.string().trim().nullable(),
    title: z.string().min(1).trim().nullable(),
    first_name: z.string().min(1).trim().nullable(),
    last_name: z.string().min(1).trim().nullable(),
    website: z.string().url().nullable(),
    affiliation: z.string().nullable(),
}).required({
    abstract: true,
    title: true,
    first_name: true,
    last_name: true,
});
