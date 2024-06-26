import { useEffect, useRef, useState } from "react";
import texts from '../../assets/texts.json';
import { MdPlayArrow, MdRestartAlt } from "react-icons/md";
import Button from "@/ui/button";
import Up from "@/motions/up";
import { Progress } from 'rsuite';

const TypingArea = ({ actualWPM, setActualWPM, totalCorrectChars, setTotalCorrectChars, setTotalIncorrectChars, gameDuration, gameType, setGameType, isTyping, setIsTyping }) => {
    const [gameText, setGameText] = useState(texts[gameType][Math.floor(Math.random() * 60)]);
    const [nextGameText, setNextGameText] = useState(texts[gameType][Math.floor(Math.random() * 60)]);
    const [seconds, setSeconds] = useState(gameDuration);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [incorrectChars, setIncorrectChars] = useState(0);
    const [mobile, setMobile] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    /* Mobile */
    useEffect(() => {
        setMobile(window.innerWidth < 620);
    }, []);

    /* Game Duration change */
    useEffect(() => {
        setSeconds(gameDuration);
        setIsTyping(false);
        setCurrentIndex(0);
        setTotalCorrectChars(0);
        setIncorrectChars(0);
        setTotalIncorrectChars(0);
        setActualWPM('0.0');
    }, [gameDuration]);

     /* Game Type change */
     useEffect(() => {
        setGameType(gameType);
        setIsTyping(false);
        setSeconds(gameDuration);
        setCurrentIndex(0);
        setTotalCorrectChars(0);
        setIncorrectChars(0);
        setTotalIncorrectChars(0);
        setGameText(texts[gameType][Math.floor(Math.random() * 60)]);
        setNextGameText(texts[gameType][Math.floor(Math.random() * 60)]);
        setActualWPM('0.0');
    }, [gameType]);

    /* Test logic */
    useEffect(() => {
        const handleKeyPress = (event: { key: string; preventDefault: () => void; }) => {
            if (event.key === ' ') {
                event.preventDefault();
            }

            if (isTyping && seconds !== 0) {
                const currentChar = gameText[currentIndex];
                switch (event.key) {
                    case ' ':
                        if (currentIndex !== 0) {
                            if (currentChar === ' ') {
                                setTotalCorrectChars((prevTotalCorrectChars) => prevTotalCorrectChars + 1);
                                setCurrentIndex((currentIndex) => currentIndex + 1);
                            } else {
                                setIncorrectChars((prevIncorrectChars) => prevIncorrectChars + 1);
                                setTotalIncorrectChars((prevTotalIncorrectChars) => prevTotalIncorrectChars + 1);
                            }
                        }
                    break;

                    case currentChar:
                        setTotalCorrectChars((prevTotalCorrectChars) => prevTotalCorrectChars + 1);
                        setCurrentIndex((currentIndex) => currentIndex + 1);
                        if (currentIndex === gameText.length - 1) {
                            setGameText(nextGameText);
                            setNextGameText(texts[gameType][Math.floor(Math.random() * 60)])
                            setCurrentIndex(0);
                            setIncorrectChars(0);
                        }

                    break;

                    case 'Backspace':
                        if (currentIndex > 0 || incorrectChars > 0) {
                            setIncorrectChars((prevIncorrectChars) => (prevIncorrectChars > 0 ? prevIncorrectChars - 1 : 0));
                        }

                    break;

                    default:
                        const alphanumeric = /^[a-zA-Z0-9\s.'\n{}[\]]$/;
                        if (alphanumeric.test(event.key)) {
                            setIncorrectChars((prevIncorrectChars) => prevIncorrectChars + 1);
                            setTotalIncorrectChars((prevTotalIncorrectChars) => prevTotalIncorrectChars + 1);
                        }

                    break;
                }
            }

            if (!isTyping && (event.key === gameText[0] || event.key === 'Enter')) {
                setSeconds(gameDuration);
                setIsTyping(true);
                if (event.key === gameText[0]) {
                    setTotalCorrectChars((prevCorrectChars) => prevCorrectChars + 1);
                    setCurrentIndex((currentIndex) => currentIndex + 1);
                }
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [isTyping, currentIndex, gameText, gameType, nextGameText, seconds]);

    /* Texts formatting */
    const getHighlightedText = (currentIndex: number) => {
        const correctText = gameText.slice(0, currentIndex);
        const currentChar = gameText[currentIndex + incorrectChars];
        const incorrectText = gameText.slice(currentIndex, currentIndex + incorrectChars);
        const remainingText = gameText.slice(currentIndex + 1 + incorrectChars);
        return (
            <div className={isTyping ? "text-xl xl:text-4xl text-primary m-auto" : "text-base xl:text-3xl text-primary m-auto"}>
                <span style={{ color: 'green' }}>{correctText}</span>
                <span style={{ borderRadius: '0.5vh', backgroundColor: 'red' }}>{incorrectText}</span>
                <span style={{ position: 'relative', display: 'inline-block', whiteSpace: 'pre-wrap' }}>
                <span style={{ display: 'inline-block'}}>{currentChar}</span>
                <span style={{
                        position: 'absolute',
                        left: '-1px',
                        height: '100%',
                        width: '0.4vh',
                        background: 'dodgerblue',
                        animation: 'blinking 1s infinite'
                    }}/>
                </span>
                {remainingText}
                <br />
                <span style={{ opacity: '0.7' }}>{nextGameText}</span>
            </div>
        );
    };

    /* Timer */
    useEffect(() => {
        let intervalId: string | number | NodeJS.Timer | undefined;
        if (isTyping && gameDuration !== 'Inf') {
            intervalId = setInterval(() => {
                setSeconds((prevSeconds: number) => {
                    if (prevSeconds === 0) {
                        clearInterval(intervalId);
                        setIsTyping(false);
                        setGameText(texts[gameType][Math.floor(Math.random() * 60)]);
                        setNextGameText(texts[gameType][Math.floor(Math.random() * 60)]);
                        setCurrentIndex(0);
                    }

                    return prevSeconds > 0 ? prevSeconds - 1 : 0;
                });
            }, 1000);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [isTyping, gameDuration]);

    /* WPM */
    useEffect(() => {
        const calculateWPM = () => {
            const timing = Number(gameDuration) - seconds + 0.01;
            const newWPM = ((totalCorrectChars / 5) / (timing / 60)).toFixed(1);
            setActualWPM(parseInt(newWPM) < 1000 ? newWPM : '0.0');
        };

        calculateWPM();
    }, [totalCorrectChars, seconds, gameDuration, isTyping, actualWPM]);

    /* Start */
    const startTimer = () => {
        if (mobile && inputRef.current) {
            inputRef.current.focus();
        }

        setSeconds(gameDuration);
        setIsTyping(true);
        setCurrentIndex(0);
        setTotalCorrectChars(0);
        setIncorrectChars(0);
        setTotalIncorrectChars(0);
        setActualWPM('0.0');
    };

    /* Restart */
    const resetTimer = () => {
        setIsTyping(false);
        setGameText(texts[gameType][Math.floor(Math.random() * 60)]);
        setNextGameText(texts[gameType][Math.floor(Math.random() * 60)]);
        setSeconds(gameDuration);
        setCurrentIndex(0);
        setTotalCorrectChars(0);
        setIncorrectChars(0);
        setTotalIncorrectChars(0);
        setActualWPM('0.0');
    };

    return (
        <div className="flex flex-col w-full align-center justify-center m-auto mt-4 lg:mt-8">
            {false ? (
                <h1 className="flex m-auto lg:text-2xl text-purple-400 mb-2 mt-2 lg:mb-8 lg:mt-8">Still in <p className="ml-2 text-red-300"> development </p>... wait for it</h1>
            ) : (
                <Up delay={0.2}>
                    <div className="flex w-9/10 lg:w-3/5 align-center justify-center gap-4 lg:gap-40 mb-8 lg:mb-20 mt-8 m-auto">
                        <p className="lg:font-bold text-red-400 m-auto" style={{ width: "20vh" }}>{seconds} seconds</p>
                        <Progress.Line percent={(1 - (seconds/gameDuration))*100} showInfo={false} strokeWidth={10} strokeColor={"green"} style={{ margin: "auto" }}/>
                        <p className="lg:font-bold text-blue-400 m-auto" style={{ width: "20vh" }}>{actualWPM} WPM</p>
                    </div>
                </Up>
            )}
            <div className="flex w-4/5 m-auto">
                {getHighlightedText(currentIndex)}
            </div>
            <div className="flex flex-row justify-center align-center gap-2 lg:gap-10">
                {!isTyping && seconds > 0 && (
                    <Button
                        aria-label="Play"
                        className="mt-4 lg:mt-8 bg-transparent text-primary"
                        icon={<MdPlayArrow size={32} />}
                        onClick={() => startTimer()}>
                        Play
                    </Button>
                )}
                <Button
                    aria-label="Restart"
                    className="mt-4 lg:mt-8 bg-transparent text-primary"
                    icon={<MdRestartAlt size={32} />}
                    onClick={() => resetTimer()}>
                    Restart
                </Button>
            </div>
            {mobile && (
                <input
                    ref={inputRef}
                    type="text"
                    style={{ position: 'absolute', left: '-9999px' }} // Hide input field off-screen
                />
            )}
        </div>
    );
};

export default TypingArea;