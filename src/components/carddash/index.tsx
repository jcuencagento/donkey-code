/* eslint-disable @next/next/no-img-element */
import { CardDashProps } from "./interface";
import CardDashSkeleton from "./skeleton";

const CardDash = (props: CardDashProps) => {
    console.log(props);
    if (!props.id) {
        return <CardDashSkeleton />;
    }

    return (
        <div className={`flex justify-between align-center rounded-lg border border-zinc-800 bg-midnight transition-all hover:shadow-lg ${props.className}`}>
            <div className="w-[70%] m-4">
                <div className="flex items-center">
                    <p className="text-xl text-gray-100 transition-all hover:text-gray-300">{props.wpm} WPM</p>
                </div>
                <p className="mt-2 text-gray-500">{props.createdAt?.toDateString()}</p>
                <p className="mt-2 text-gray-500">{props.gameDuration} seconds</p>
                <p className="text-gray-400">Typing: {props.gameType}</p>
            </div>
            {props.index === 0 && (
                <img src="./img/1st.svg" alt="First" style={{ height: '35%', margin: 'auto', marginLeft: '0' }}/>
            )}
            {props.index === 1 && (
                <img src="./img/2nd.svg" alt="Second" style={{ height: '35%', margin: 'auto', marginLeft: '0' }}/>
            )}
            {props.index === 2 && (
                <img src="./img/3rd.svg" alt="Third" style={{ height: '35%', margin: 'auto', marginLeft: '0' }}/>
            )}
        </div>
    );
};

export default CardDash;