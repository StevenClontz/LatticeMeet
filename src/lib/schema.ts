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

export const submissionWorksheetSchema = z.object({
    submissions: z.object({
        id: z.string(),
        title: z.string(),
        abstract: z.string(),
        submissions_status: z.object({
            status: z.enum(["submitted","accepted","declined"])
        }).nullable(),
        profiles: profileSchema.extend({
            profiles_status: z.object({verified:z.boolean()}).nullable()
        }).nullable(),
    }).array()
});

// const submissions: {
//     abstract: string;
//     collection_id: string;
//     created_at: string;
//     id: string;
//     profile_id: string;
//     title: string;
//     submissions_status: {
//         id: string;
//         status: "submitted" | "accepted" | "declined";
//     } | null;
//     profiles: {
//         ...;
//     } | null;
// }[]

export const registrationSchema = z.object({
    registration_option_id: z.string().trim(),
    first_name: z.string().min(1).trim(),
    last_name: z.string().min(1).trim(),
    website: z.string().url().nullable(),
    affiliation: z.string().nullable(),
}).required({
    registration_option_id: true,
    first_name: true,
    last_name: true,
});
