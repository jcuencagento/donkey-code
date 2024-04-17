import GamesOptions from "../gamesoptions";
import TypingArea from "../typingarea";

const Test = ({ isTyping, setIsTyping, actualWPM, setActualWPM, totalCorrectChars, setTotalCorrectChars, setTotalIncorrectChars, gameType, setGameType, gameDuration, setGameDuration }) => {
    return (
        <div className="flex-col align-center justify-center">
            <GamesOptions
                gameType={gameType}
                gameDuration={gameDuration}
                setGameType={setGameType}
                setGameDuration={setGameDuration}
                isTyping={isTyping}/>
            <TypingArea
                actualWPM={actualWPM}
                setActualWPM={setActualWPM}
                totalCorrectChars={totalCorrectChars}
                setTotalCorrectChars={setTotalCorrectChars}
                setTotalIncorrectChars={setTotalIncorrectChars}
                gameDuration={gameDuration}
                gameType={gameType}
                setGameType={setGameType}
                isTyping={isTyping}
                setIsTyping={setIsTyping}/>
        </div>
    );
};

export default Test;