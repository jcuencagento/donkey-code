import type { NextPage } from "next";

import Up from "@/motions/up";
import Test from "@/components/test";
import { CreateScoreInput } from "@/schema/score.schema";
import { toastStyles } from "@/styles/toast";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import Link from "@/components/link";
import IconButton from "@/ui/iconButton";
import { BiBox } from "react-icons/bi";
import confetti from "canvas-confetti";

const Home: NextPage = () => {
    const [loading, setLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [actualWPM, setActualWPM] = useState('0.0');
    const [lastWPM, setLastWPM] = useState('0.0');
    const [gameType, setGameType] = useState('English');
    const [gameDuration, setGameDuration] = useState(30);
    const [mobile, setMobile] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const { data: session } = useSession();

    /* Mobile */
    useEffect(() => {
        setMobile(window.innerWidth < 620);
    }, []);

    /* Modal test done */
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsModalOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    /* Send score to database */
    const { mutate } = trpc.links.createScore.useMutation({
        onSuccess: () => {
            setLoading(false);
            confetti({
                particleCount: 150,
                spread: 180
            });

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
        setIsModalOpen(true);
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

    useEffect(() => {
        if (!isTyping && actualWPM !== '0.0') {
            onSubmit({ wpm: actualWPM, gameType: gameType, gameDuration: gameDuration.toString(), mobile: mobile });
            setLastWPM(actualWPM);
        }
    }, [isTyping]);

    return (
        <div className="flex flex-col items-center justify-center pt-4 xl:pt-8 h-full overflow-hidden transition-all duration-100">
            {!isTyping && (
                <Up>
                    <h1 className="text-2xl xl:text-4xl mb-1 xl:mb-4 text-primary">
                        Typing test and practice
                    </h1>
                </Up>
            )}
            {!isTyping ? (
                <Up delay={0.2}>
                    <h3 className="text-sm xl:text-2xl align-center justify-center mb-4 xl:mb-8 text-primary/70">
                        move your hands!
                    </h3>
                </Up>
            ) : (
                <div className="mt-6 mb-6 xl:mt-14 xl:mb-16"></div>
            )}
            <Up delay={0.4}>
                <div className="w-full">
                    <Test
                        isTyping={isTyping}
                        setIsTyping={setIsTyping}
                        actualWPM={actualWPM}
                        setActualWPM={setActualWPM}
                        gameType={gameType}
                        setGameType={setGameType}
                        gameDuration={gameDuration}
                        setGameDuration={setGameDuration}/>
                </div>
            </Up>
            {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-b bg-opacity-60 flex justify-center items-center" style={{ marginLeft: '0' }}>
                    <div ref={modalRef} className="flex-col bg-white p-8 rounded-lg justify-center align-center m-auto">
                        <h2 className="text-xl font-bold mb-2 text-gray-800">Test done!</h2>
                        <h6 className="text-md font-semibold mb-6 text-gray-600">Performed WPM: {lastWPM}</h6>
                        <div className="flex gap-4 justify-between align-center">
                            <Link aria-label="Dashboard" href="/dash">
                                <IconButton className="text-black" icon={<BiBox size={24} />} />
                            </Link>
                            <p className="text-black">Go to see your dashboard</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
