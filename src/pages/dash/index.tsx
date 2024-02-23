import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "@/server/common/get-server-auth-session";
import { useForm } from "react-hook-form";
import { ScoreSchema } from "@/schema/score.schema";

import { FilterScoreInput } from "@/schema/score.schema";

import Loader from "@/motions/loader";
import CardDash from "@/components/carddash";
import CardDashSkeleton from "@/components/carddash/skeleton";
import CardUser from "@/components/carduser";
import DashboardLayout from "@/layout/dashboard";

import { BiRocket } from "react-icons/bi";

import Alert from "@/ui/alert";
import LinkRoute from "@/ui/linkRoute";
import { Input } from "@/ui";

const Dashboard = () => {
    const { register } = useForm<FilterScoreInput>();
    const [filter, setFilter] = useState("");
    const [scores, setScores] = useState<ScoreSchema[]>([]);
    const [searchScores, setSearchScores] = useState("");

    const avatar_image = "/img/avatar.png";
    const { data: scoresData, isLoading, error } = trpc.links.getScores.useQuery({ filter });

    if (error) {
        return (
            <Alert>
                <p>{error.message}</p>
            </Alert>
        );
    }

    const filteredScores = scoresData?.filter((score) => {
        return score.gameType.toLowerCase().includes(searchScores.toLowerCase());
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
        <DashboardLayout>
            <div className="my-6">
                <div className="w-full">
                <Input
                    id="filter"
                    type="text"
                    placeholder="Search scores"
                    {...register("filter")}
                    onChange={(e) => { setSearchScores(e.target.value); }}
                />
                </div>
            </div>
            {isLoading && (
                <>
                    <div className="mt-8 flex flex-col items-center justify-center">
                        <p className="mb-2">Loading your scores...</p>
                        <Loader />
                    </div>
                </>
            )}
            <div className="flex flex-col lg:flex-row gap-12">
                <div className="mt-5 lg:w-[30%] flex-grow h-auto">
                    <CardUser
                        scores={scores}
                        creatorUser={scores[0]?.creatorUser || 'Yourself'}
                        creatorImage={scores[0]?.creatorImage || avatar_image}
                        no_scores={scores.length === 0}
                    />
                </div>
                <div className="lg:w-[70%] mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
                    {filteredScores?.slice(0, 9)?.map((score, index) => (
                        <CardDash
                            key={score.id}
                            id={score.id}
                            gameType={score.gameType}
                            gameDuration={score.gameDuration}
                            wpm={score.wpm}
                            mobile={score.mobile || false}
                            createdAt={score.createdAt}
                            creatorId={score.creatorId}
                            creatorUser={score.creatorUser}
                            index={index}
                        />
                    ))}
                    {Array.from({ length: 9 - (filteredScores?.length || 0) }).map((_, index) => (
                        <CardDashSkeleton />
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const session = await getServerAuthSession(ctx);

    if (!session) {
        return {
            redirect: {
                destination: "/auth",
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
};

export default Dashboard;
