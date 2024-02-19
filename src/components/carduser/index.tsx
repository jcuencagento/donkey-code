/* eslint-disable @next/next/no-img-element */
import { ScoreSchema } from "@/schema/score.schema";
import { CardUserProps } from "./interface";
import Link from "next/link";
import { BiPlayCircle } from "react-icons/bi";
import IconButton from "@/ui/iconButton";

const CardUser = (props: CardUserProps) => {
    function calculateAverageWPM(scores: Array<ScoreSchema>) {
        const totalWPM = scores.reduce((acc, score) => acc + parseInt(score.wpm), 0);
        return totalWPM / scores.length;
    }

    function mostRepeatedGameType(scores: Array<ScoreSchema>) {
        const gameTypeCounts: { [gameType: string]: number } = {};
        scores.forEach(score => {
            const gameType = score.gameType;
            if (gameTypeCounts[gameType]) {
                gameTypeCounts[gameType]++;
            } else {
                gameTypeCounts[gameType] = 1;
            }
        });

        let mostRepeatedType = '';
        let maxCount = 0;
        for (const [gameType, count] of Object.entries(gameTypeCounts)) {
            if (count > maxCount) {
                maxCount = count;
                mostRepeatedType = gameType;
            }
        }

        return mostRepeatedType;
    }

    function mostRepeatedGameDuration(scores: Array<ScoreSchema>) {
        const gameDurationCounts: { [gameDuration: string]: number } = {};
        scores.forEach(score => {
            const gameDuration = score.gameDuration;
            if (gameDurationCounts[gameDuration]) {
                gameDurationCounts[gameDuration]++;
            } else {
                gameDurationCounts[gameDuration] = 1;
            }
        });

        let mostRepeatedDuration = '';
        let maxCount = 0;
        for (const [gameType, count] of Object.entries(gameDurationCounts)) {
            if (count > maxCount) {
                maxCount = count;
                mostRepeatedDuration = gameType;
            }
        }

        return mostRepeatedDuration;
    }

    if (props.no_scores) {
        return (
            <div className={`flex flex-col p-4 justify-between align-center rounded-lg border border-zinc-800 bg-midnight transition-all w-full h-full`}>
                <div className="flex flex-col justify-center gap-4 align-center m-auto">
                    <img src={props.creatorImage} alt="Avatar" height={95} width={95} style={{ margin: 'auto', borderRadius: '50%' }}/>
                    <p className="text-gray-200 text-lg m-auto">{props.creatorUser}</p>
                </div>
                <div className="flex flex-col justify-center align-center w-[90%] mt-4 m-auto">
                    <p className="text-2xl text-gray-100 transition-all m-auto">Test yourself now!</p>
                    <Link className="m-auto mt-4" aria-label="Type now" href="/">
                        <IconButton aria-label="Open code" icon={<BiPlayCircle size={42} />} />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={`flex flex-col p-4 justify-between align-center rounded-lg border border-zinc-800 bg-midnight transition-all w-full h-full`}>
            <div className="flex flex-col justify-center gap-4 align-center m-auto">
                <img src={props.creatorImage} alt="Avatar" height={95} width={95} style={{ margin: 'auto', borderRadius: '50%' }}/>
                <p className="text-gray-200 text-lg m-auto">{props.creatorUser}</p>
            </div>
            <div className="flex flex-col justify-center align-center w-[90%] mt-4 m-auto">
                <p className="text-xl text-gray-100 transition-all m-auto">Average WPM -&gt; {calculateAverageWPM(props.scores).toFixed(2)}</p>
                <p className="mt-2 text-lg text-gray-400">Total tests done -&gt; {props.scores.length}</p>
                <p className="text-lg text-gray-400">Favourite typing -&gt; {mostRepeatedGameType(props.scores)}</p>
                <p className="text-lg text-gray-400">Usual test time -&gt; {mostRepeatedGameDuration(props.scores)} seconds</p>
            </div>
        </div>
    );
};

export default CardUser;
