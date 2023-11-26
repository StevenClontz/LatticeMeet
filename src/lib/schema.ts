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
