import z from "zod";

export const ScoreSchema = z.object({
    id: z.number(),
    gameType: z.string(),
    gameDuration: z.string(),
    wpm: z.string(),
    createdAt: z.date(),
    creatorId: z.string(),
    creatorUser: z.string(),
    creatorImage: z.string()
});

export const CreateScoreSchema = z.object({
    gameType: z.string(),
    gameDuration: z.string(),
    wpm: z.string(),
    creatorId: z.string(),
    creatorUser: z.string(),
    creatorImage: z.string()
});

export type ScoreSchema = z.TypeOf<typeof ScoreSchema>
export type CreateScoreInput = z.TypeOf<typeof CreateScoreSchema>

export const FilterScoreSchema = z.object({
    filter: z.string(),
});

export type FilterScoreInput = z.TypeOf<typeof FilterScoreSchema>