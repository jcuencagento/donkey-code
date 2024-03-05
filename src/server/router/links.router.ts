import {
    FilterScoreSchema,
    CreateScoreSchema
} from "@/schema/score.schema";

import { router, publicProcedure } from "./trpc";

export const linkRouter = router({
    /* Create new score */
    createScore: publicProcedure.input(CreateScoreSchema).mutation(({ ctx, input }) => {
        const newScore = ctx.prisma.score.create({
            data: {
                ...input,
                creatorId: ctx.session?.user?.id,
                creatorUser: ctx.session?.user?.username || 'unknown',
                creatorImage: ctx.session?.user?.image || './img/avatar.png',
            },
        });
        return newScore;
    }),

    /* Get all scores (one user) */
    getScores: publicProcedure.input(FilterScoreSchema).query(({ ctx, input }) => {
        return ctx.prisma.score?.findMany({
            orderBy: { wpm: 'desc' },
            where: {
                creatorId: ctx.session?.user?.id,
                AND: input.filter
                    ? [
                        {
                            OR: [
                                { gameType: { contains: input.filter } },
                                { gameDuration: { contains: input.filter } },
                                { wpm: { contains: input.filter } },
                            ],
                        },
                    ]
                    : undefined,
            },
        });
    }),

   /* Get all scores (all users) */
    getAllScores: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.score?.findMany({ orderBy: { wpm: 'desc' } });
    }),
});
