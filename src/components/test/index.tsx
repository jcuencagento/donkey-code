import { useState } from "react";
import toast from "react-hot-toast";
import { toastStyles } from "@/styles/toast";
import { trpc } from "@/utils/trpc";
import { CreateScoreInput } from "@/schema/score.schema";
import { Button } from "@/ui";
import { BiRocket } from "react-icons/bi";
import { useSession } from "next-auth/react";

const Test = () => {
    const [loading, setLoading] = useState(false);
    const [testValues, setTestValues] = useState({ wpm: '0', gameType: 'JavaScript', gameDuration: '30' });
    const [isActive, setIsActive] = useState(false);
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
        <div className="flex gap-4 align-center justify-center">
            <Button
                isLoading={loading}
                loadingText="Submitting your score..."
                onClick={() => {onSubmit(testValues)}}
                icon={<BiRocket size={18} />}
            >
                Send Score
            </Button>
            <div className="m-auto">
                <span style={{ position: 'relative', display: 'inline-block', whiteSpace: 'pre-wrap' }}>
                <span style={{ display: 'inline-block'}}>T</span>
                    <span 
                        style={{
                            position: 'absolute',
                            left: '-1.1px',
                            height: '100%',
                            width: '0.25vh',
                            background: 'violet',
                            animation: 'blinking 1s infinite'
                        }}
                    />
                </span>
                est area in development...
            </div>
        </div>
    );
};

export default Test;