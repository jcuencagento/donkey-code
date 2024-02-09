import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { useForm } from "react-hook-form";
import { ScoreSchema } from "@/schema/score.schema";

import { FilterScoreInput } from "@/schema/score.schema";

import Loader from "@/motions/loader";
import Card from "@/components/card";
import ClassificationLayout from "@/layout/classification";

import { BiRocket } from "react-icons/bi";

import Alert from "@/ui/alert";
import { Input } from "@/ui";

const Classification = () => {
    const { register } = useForm<FilterScoreInput>();
    const [filter, setFilter] = useState("");
    const [scores, setScores] = useState<ScoreSchema[]>([]);
    const [searchScores, setSearchScores] = useState("");

    const avatar_image = "/img/avatar.png";
    const { data: scoresData, isLoading, error } = trpc.links.getAllScores.useQuery();

    if (error) {
        return (
            <Alert>
                <p>{error.message}</p>
            </Alert>
        );
    }

    const filteredScores = scoresData?.filter((score) => {
        return score.wpm.toLowerCase().includes(searchScores.toLowerCase());
    });

    if (!scoresData) {
        return (
            <div className="mt-8 flex flex-col items-center justify-center">
                <p className="mb-2">Loading your scores...</p>
                <Loader />
            </div>
        );
    }

    if (scores.length === 0 && scoresData.length > 0) {
        setScores(scoresData as ScoreSchema[]);
    }

    return (
        <ClassificationLayout>
            {isLoading && (
                <>
                    <div className="mt-8 flex flex-col items-center justify-center">
                        <p className="mb-2">Loading classification...</p>
                        <Loader />
                    </div>
                </>
            )}
            {scores && (
                <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredScores?.map((score) => (
                        <Card
                            key={score.id}
                            id={score.id}
                            gameType={score.gameType}
                            gameDuration={score.gameDuration}
                            wpm={score.wpm}
                            creatorId={score.creatorId}
                            creatorUser={score.creatorUser}
                            creatorImage={score.creatorImage || avatar_image}
                        />
                    ))}
                </div>
            )}
        </ClassificationLayout>
    );
};

export default Classification;
