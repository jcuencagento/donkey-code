import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/db/client";
import { getServerAuthSession } from "@/server/common/get-server-auth-session";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        return await getScores(req, res);
    } else {
        return res
            .status(405)
            .json({ message: "[X] Method not allowed.", success: false });
    }
}

async function getScores(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerAuthSession({ req, res });
    if (session) {
        try {
            const scores = await prisma.score?.findMany({
                where: {
                    creatorId: session?.user?.id,
                },
            });
            return res.status(200).json(scores);
        } catch (error) {
            console.error("[X] Request error:", error);
            res.status(500).json({
                error: `[X] Error getting query.`,
                message: `${error}`,
                success: false,
            });
        }
    } else {
        return res
            .status(401)
            .json({ error: "[X] Error: Not logged in.", success: false });
    }
}
