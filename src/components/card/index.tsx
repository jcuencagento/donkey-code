/* eslint-disable @next/next/no-img-element */
import { CardProps } from "./interface";

const Card = (props: CardProps) => {
    return (
        <div className={`flex justify-between align-center rounded-lg border border-zinc-800 bg-midnight transition-all hover:shadow-lg ${props.className}`}>
            <div className="flex gap-4 align-center m-auto">
                <img src={props.creatorImage} alt="Avatar" height={45} width={45} style={{ borderRadius: '50%' }}/>
                <p className="text-gray-200 m-auto">{props.creatorUser}</p>
            </div>
            <div className="w-[40%] m-4">
                <div className="flex items-center">
                    <p className="text-xl text-gray-100 transition-all hover:text-gray-300">{props.wpm} WPM</p>
                </div>
                <p className="mt-2 text-gray-500">{props.gameDuration} seconds</p>
                <p className="mt-2 text-gray-500">{props.createdAt?.toDateString()}</p>
                <p className="text-gray-400">Typing: {props.gameType}</p>
            </div>
        </div>
    );
};

export default Card;
