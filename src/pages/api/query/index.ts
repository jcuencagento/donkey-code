import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/db/client";
import { getServerAuthSession } from "@/server/common/get-server-auth-session";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        return await createNewScore(req, res);
    } else {
        return res
            .status(405)
            .json({ message: "[X] Method not allowed: ", success: false });
    }
}

/* New Score */
async function createNewScore(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerAuthSession({ req, res });
    const body = req.body;
    if (session) {
        try {
            const newScore = await prisma.score?.create({
                data: {
                    gameType: body.gameType,
                    gameDuration: body.gameDuration,
                    wpm: body.wpm,
                    createdAt: body.createdAt,
                    createdBy: body.createdBy,
                    creatorId: body.creatorId,
                    creatorUser: body.creatorUser,
                    creatorImage: body.creatorImage || '/img/avatar.png'
                },
            });
            return res.status(200).json(newScore);
        } catch (error) {
            console.error("[X] Request error:", error);
            res
                .status(500)
                .json({ error: "[X] Error creating question:", success: false });
        }
    } else {
        return res
            .status(401)
            .json({ error: "[X] Error: Not logged in.", success: false });
    }
}
