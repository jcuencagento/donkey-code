import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "@/server/common/get-server-auth-session";
import { useForm } from "react-hook-form";
import { ScoreSchema } from "@/schema/score.schema";

import { FilterScoreInput } from "@/schema/score.schema";

import Loader from "@/motions/loader";
import Card from "@/components/card";
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
            {scores.length === 0 && (
                <div className="mt-5 flex flex-col items-center justify-center">
                    <BiRocket className="mb-4 text-gray-400" size={64} />
                    <p className="mb-4 text-xl">Create your first score testing your skills...</p>
                    <LinkRoute href="/" className="border border-gray-400">
                        Play now!
                    </LinkRoute>
                </div>
            )}
            {isLoading && (
                <>
                    <div className="mt-8 flex flex-col items-center justify-center">
                        <p className="mb-2">Loading your scores...</p>
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
