import { ScoreSchema } from "@/schema/score.schema";

export interface CardUserProps {
    scores: Array<ScoreSchema>,
    creatorUser: string,
    creatorImage: string,
}
