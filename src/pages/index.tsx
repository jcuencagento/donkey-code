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
import { Input } from "@/ui";
import IconButton from "@/ui/iconButton";
import { BiBox } from "react-icons/bi";

const Home: NextPage = () => {
    const [loading, setLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [actualWPM, setActualWPM] = useState('0.0');
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

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    /* Send score to database */
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
        }
    }, [isTyping]);

    return (
        <div className="flex flex-col items-center justify-center pt-4 xl:pt-8 h-full overflow-hidden bg-gradient-to-r transition-all duration-100">
            {!isTyping && (
                <Up>
                    <h1 className="text-2xl lg:text-4xl mb-2 lg:mb-5">
                        Typing test and practice
                    </h1>
                </Up>
            )}
            {!isTyping ? (
                <Up delay={0.2}>
                    <h3 className="text-sm lg:text-2xl align-center justify-center mb-6 xl:mb-10 text-gray-400">
                        move your hands!
                    </h3>
                </Up>
            ) : (
                <div className="mt-8 mb-8 xl:mt-16 xl:mb-16"></div>
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
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center" style={{ marginLeft: '0' }}>
                    <div ref={modalRef} className="flex-col bg-white p-8 rounded-lg justify-center align-center m-auto">
                        <h2 className="text-lg font-bold mb-2 text-gray-800">Test done!</h2>
                        <h6 className="text-sm font-light mb-6 text-gray-600">Performed WPM: {actualWPM}</h6>
                        <div className="flex gap-4 justify-between align-center">
                            <Link aria-label="Dashboard" href="/dash">
                                <IconButton icon={<BiBox size={17} />} />
                            </Link>
                            Go to see your dashboard
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
