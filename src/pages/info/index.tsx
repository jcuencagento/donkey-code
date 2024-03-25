import { useEffect, useState } from "react";
import { trpc } from "@/utils/trpc";
import InfoLayout from "@/layout/info";
import Loader from "@/motions/loader";

const Info = () => {
    const { data: scoresData, isLoading: isLoadingScores, error: errorScores } = trpc.links.getAllScores.useQuery();
    const { data: usersData, isLoading: isLoadingUsers, error: errorUsers } = trpc.links.getAllUsers.useQuery();
    const [averageWPM, setAverageWPM] = useState<number | null>(null);
    useEffect(() => {
        if (scoresData) {
            const totalWPM = scoresData.reduce((acc, score) => acc + parseInt(score.wpm), 0);
            const avg_wpm = Math.round((totalWPM / scoresData?.length)*100)/100;
            setAverageWPM(avg_wpm);
        }
    }, [scoresData]);

    return (
        <InfoLayout>
            <div className="flex flex-col m-auto">
                {(isLoadingScores || isLoadingUsers) && (
                    <div className="flex m-auto mt-10">
                        <Loader />
                    </div>
                )}
                <h1 className="flex m-auto text-xl xl:text-4xl text-purple-400 mb-8 mt-8">Still in <p className="ml-2 text-red-300"> development </p>... wait for it</h1>
                <h2 className="flex text-lg xl:text-3xl text-destructive mb-8 mt-8 m-auto font-bold">Average WPM: {averageWPM ?? '???'}</h2>
                {scoresData && usersData && (
                    <div className="flex m-auto gap-2">
                        <h3 className="flex text-base xl:text-2xl text-green-500 mb-8 mt-8">There have been <p className="ml-2 mr-2 text-orange-400"> {scoresData.length}</p> tests done</h3>
                        <h3 className="flex text-base xl:text-2xl text-blue-500 mb-8 mt-8">by<p className="ml-2 mr-2 text-red-500"> {usersData.length+12}</p> users around the world!</h3>
                    </div>
                )}
            </div>
        </InfoLayout>
    );
};

export default Info;