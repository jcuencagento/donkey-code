import { useEffect, useState } from "react";
import { trpc } from "@/utils/trpc";
import InfoLayout from "@/layout/info";
import Loader from "@/motions/loader";

const Info = () => {
    const { data: scoresData, isLoading: isLoadingScores, error: errorScores } = trpc.links.getAllScores.useQuery();
    const { data: usersData, isLoading: isLoadingUsers, error: errorUsers } = trpc.links.getAllUsers.useQuery();
    const [averageWPM, setAverageWPM] = useState<number | null>(null);
    const [mobileScores, setMobileScores] = useState<number>(0);
    const [javascriptScores, setJavascriptScores] = useState<number>(0);
    const [spanishScores, setSpanishScores] = useState<number>(0);
    useEffect(() => {
        if (scoresData) {
            const totalWPM = scoresData.reduce((acc, score) => acc + parseInt(score.wpm), 0);
            const avg_wpm = Math.round((totalWPM / scoresData?.length)*100)/100;
            setAverageWPM(avg_wpm);
            const mobile = scoresData.reduce((acc, score) => score.mobile ? acc + 1 : acc, 0);
            setMobileScores(mobile);
            const javascript = scoresData.reduce((acc, score) => score.gameType === 'JavaScript' ? acc + 1 : acc, 0);
            const spanish = scoresData.reduce((acc, score) => score.gameType === 'Spanish' ? acc + 1 : acc, 0);
            setJavascriptScores(javascript);
            setSpanishScores(spanish);
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
                <h2 className="flex text-lg xl:text-3xl text-destructive mb-0 mt-8 m-auto font-bold lg:mb-4">Average WPM: {averageWPM ?? '???'}</h2>
                {scoresData && usersData && (
                    <label className="flex flex-col m-auto gap-2">
                        <div className="flex m-auto flex-col gap-2 mb-6 lg:mb-16 mt-8 lg:flex-row">
                            <h3 className="flex text-lg xl:text-2xl text-green-500">There have been <p className="ml-2 mr-2 text-orange-400"> {scoresData.length}</p> tests done</h3>
                            <h3 className="flex text-lg xl:text-2xl text-blue-500">by<p className="ml-2 mr-2 text-red-500"> {usersData.length+12}</p> users around the world!</h3>
                        </div>
                        <h4 className="flex text-base xl:text-xl text-yellow-500 mb-2 mt-0 justify-center lg:mb-8">People typed {mobileScores} times in mobile and {scoresData.length - mobileScores} in PC...</h4>
                        <h4 className="flex text-base xl:text-xl text-orange-500 mb-8 mt-0 justify-center">Also users tested {javascriptScores} times in JavaScript 🤓 or {spanishScores} in Spanish</h4>
                    </label>
                )}
                {/* Graph distribution tests WPM */}
                {/* Graph WPM over time */}
            </div>
        </InfoLayout>
    );
};

export default Info;