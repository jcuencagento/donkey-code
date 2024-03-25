import { useEffect, useState } from "react";
import { trpc } from "@/utils/trpc";
import InfoLayout from "@/layout/info";
import { useForm } from "react-hook-form";
import { ScoreSchema } from "@/schema/score.schema";

const Info = () => {
    const { data: scoresData, isLoading: isLoadingScores, error: errorScores } = trpc.links.getAllScores.useQuery();
    const { data: usersData, isLoading: isLoadingUsers, error: errorUsers } = trpc.links.getAllUsers.useQuery();
    console.log(scoresData);
    console.log(usersData);
    console.log(isLoadingScores);
    console.log(isLoadingUsers);
    console.log(errorScores);
    console.log(errorUsers);
    return (
        <InfoLayout>
            <div className="flex flex-col">
                <h1 className="flex m-auto text-xl xl:text-4xl text-purple-400 mb-8 mt-8">Still in <p className="ml-2 text-red-300"> development </p>... wait for it</h1>
                {scoresData && usersData && (
                    <div className="flex m-auto gap-2">
                        <h3 className="flex text-base xl:text-2xl text-green-500 mb-8 mt-8">There have been <p className="ml-2 mr-2 text-orange-400"> {scoresData.length}!</p> tests done</h3>
                        <h3 className="flex text-base xl:text-2xl text-blue-500 mb-8 mt-8">by<p className="ml-2 mr-2 text-red-500"> {usersData.length}</p> users around the world</h3>
                    </div>
                )}
            </div>
        </InfoLayout>
    );
};

export default Info;