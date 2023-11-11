import { z } from 'zod';

export const profileSchema = z.object({
    first_name: z.string().min(1).trim().nullable(),
    last_name: z.string().min(1).trim().nullable(),
    website: z.string().url().nullable(),
    orcid_id: z.string().url().nullable(),
    avatar_url: z.string().url().nullable(),
}).required({
    first_name: true,
    last_name: true,
});
