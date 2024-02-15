import { useState } from "react";
import toast from "react-hot-toast";
import { toastStyles } from "@/styles/toast";
import { trpc } from "@/utils/trpc";
import { CreateScoreInput } from "@/schema/score.schema";
import { Button } from "@/ui";
import { BiRocket } from "react-icons/bi";
import { useSession } from "next-auth/react";
import GamesOptions from "../gamesoptions";
import TypingArea from "../typingarea";

const Test = () => {
    const [loading, setLoading] = useState(false);
    const [testValues, setTestValues] = useState({ wpm: '0', gameType: 'JavaScript', gameDuration: '30' });
    const [isActive, setIsActive] = useState(false);
    const [actualWPM, setActualWPM] = useState(null);
    const [gameType, setGameType] = useState('JavaScript');
    const [gameDuration, setGameDuration] = useState(30);
    const { data: session } = useSession();

    const { mutate } = trpc.links.createScore.useMutation({
        onSuccess: () => {
            setLoading(false);
            toast("Data stored successfully!", {
                icon: "🥳",
                style: toastStyles,
            });
        },
        onError: () => {
            setLoading(false);
            toast("Data not correctly stored...", {
                icon: "😿",
                style: toastStyles,
            });
        },
    });

    const onSubmit = (values: CreateScoreInput) => {
        setLoading(true);
        if (session) {
            mutate(values);
        } else {
            setLoading(false);
            toast("Nice! Login to store your scores", {
                icon: "😼",
                style: toastStyles,
            });
        }
    };

    return (
        <div className="flex-col align-center justify-center">
            <GamesOptions
                gameType={gameType}
                gameDuration={gameDuration}
                setGameType={setGameType}
                setGameDuration={setGameDuration}/>
            <Button
                aria-label="Submit"
                className="m-auto"
                isLoading={loading}
                loadingText="Submitting your score..."
                onClick={() => {onSubmit(testValues)}}
                icon={<BiRocket size={18} />}
            >
                Send Score
            </Button>
            <TypingArea
                wpm={actualWPM}/>
        </div>
    );
};

export default Test;