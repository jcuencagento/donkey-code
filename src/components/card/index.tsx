/* eslint-disable @next/next/no-img-element */
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { CardProps } from "./interface";
import IconButton from "@/ui/iconButton";
import { MdPhoneIphone } from "react-icons/md";

const Card = (props: CardProps) => {
    return (
        <div className={`flex justify-between align-center rounded-lg border border-zinc-800 bg-midnight transition-all hover:shadow-lg ${props.className}`}>
            <div className="flex flex-col gap-4 m-auto">
                <div className="flex gap-4 align-center m-auto">
                    <img src={props.creatorImage} alt="Avatar" height={window?.innerWidth > 620 ? 45 : 30} width={window?.innerWidth > 620 ? 45 : 30} style={{ borderRadius: '50%' }}/>
                    <p className="text-gray-200 m-auto">{props.creatorUser}</p>
                </div>
                {props.mobile ? (
                    <div className="flex m-auto gap-2 pt-2 text-gray-400">
                        At
                        <IconButton aria-label="Mobile" icon={<MdPhoneIphone size={22} />} />
                    </div>
                ) : (
                    <div className="flex m-auto gap-2 pt-2 text-gray-400">
                        At
                        <IconButton aria-label="PC" icon={<HiOutlineDesktopComputer size={22} />} />
                    </div>
                )}
            </div>
            <div className="w-[40%] m-4 mr-0">
                <div className="flex items-center">
                    <p className="text-xl text-gray-100 transition-all hover:text-gray-300">{props.wpm} WPM</p>
                </div>
                <p className="mt-2 text-gray-500">{props.createdAt?.toDateString()}</p>
                <p className="mt-2 text-gray-500">{props.gameDuration} seconds</p>
                <p className="text-gray-400">Typing: {props.gameType}</p>
            </div>
            {props.index === 0 && (
                <img src="./img/1st.svg" alt="First" style={ window?.innerWidth > 620 ? { height: '30%', margin: 'auto', marginLeft: '0' } : { height: '20%', margin: 'auto', marginLeft: '0' }}/>
            )}
            {props.index === 1 && (
                <img src="./img/2nd.svg" alt="Second" style={ window?.innerWidth > 620 ? { height: '30%', margin: 'auto', marginLeft: '0' } : { height: '20%', margin: 'auto', marginLeft: '0' }}/>
            )}
            {props.index === 2 && (
                <img src="./img/3rd.svg" alt="Third" style={ window?.innerWidth > 620 ? { height: '30%', margin: 'auto', marginLeft: '0' } : { height: '20%', margin: 'auto', marginLeft: '0' }}/>
            )}
        </div>
    );
};

export default Card;
