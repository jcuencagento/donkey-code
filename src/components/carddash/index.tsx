/* eslint-disable @next/next/no-img-element */
import IconButton from "@/ui/iconButton";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { MdPhoneIphone } from "react-icons/md";
import { CardDashProps } from "./interface";
import CardDashSkeleton from "./skeleton";

const CardDash = (props: CardDashProps) => {
    if (!props.id) {
        return <CardDashSkeleton />;
    }

    return (
        <div className={`flex justify-between align-center rounded-lg border border-zinc-800 bg-midnight transition-all hover:shadow-lg ${props.className}`}>
            <div className="w-[60%] m-4">
                <div className="flex items-center">
                    <p className="text-xl text-primary transition-all hover:text-orange-400">{props.wpm} WPM</p>
                </div>
                <p className="mt-2 text-gray-600">{props.createdAt?.toDateString()}</p>
                <p className="mt-2 text-gray-600">{props.gameDuration} seconds</p>
                <p className="text-gray-500">Typing: {props.gameType}</p>
            </div>
            {props.index === 0 && (
                <div className="flex flex-col">
                    <img src="./img/1st.svg" alt="First" style={{ height: '30%', marginTop: '1.5vh', marginLeft: '0' }}/>
                    {props.mobile ? (
                        <div className="flex gap-2 pt-2 pr-2 text-primary">
                            At
                            <IconButton aria-label="Mobile" icon={<MdPhoneIphone size={22} />} />
                        </div>
                    ) : (
                        <div className="flex gap-2 pt-2 text-primary">
                            At
                            <IconButton aria-label="PC" icon={<HiOutlineDesktopComputer size={22} />} />
                        </div>
                    )}
                </div>
            )}
            {props.index === 1 && (
                <div className="flex flex-col">
                    <img src="./img/2nd.svg" alt="Second" style={{ height: '30%', marginTop: '1.5vh', marginLeft: '0' }}/>
                    {props.mobile ? (
                        <div className="flex gap-2 pt-2 text-primary">
                            At
                            <IconButton aria-label="Mobile" icon={<MdPhoneIphone size={22} />} />
                        </div>
                    ) : (
                        <div className="flex gap-2 pt-2 text-primary">
                            At
                            <IconButton aria-label="PC" icon={<HiOutlineDesktopComputer size={22} />} />
                        </div>
                    )}
                </div>
            )}
            {props.index === 2 && (
                <div className="flex flex-col">
                    <img src="./img/3rd.svg" alt="Third" style={{ height: '30%', marginTop: '1.5vh', marginLeft: '0' }}/>
                    {props.mobile ? (
                        <div className="flex gap-2 pt-2 text-primary">
                            At
                            <IconButton aria-label="Mobile" icon={<MdPhoneIphone size={22} />} />
                        </div>
                    ) : (
                        <div className="flex gap-2 pt-2 text-primary">
                            At
                            <IconButton aria-label="PC" icon={<HiOutlineDesktopComputer size={22} />} />
                        </div>
                    )}
                </div>
            )}
            {props.index > 2 && (
                <div className="flex m-auto text-primary">
                    {props.mobile ? (
                        <div className="flex gap-2">
                            At
                            <IconButton aria-label="Mobile" icon={<MdPhoneIphone size={22} />} />
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            At
                            <IconButton aria-label="PC" icon={<HiOutlineDesktopComputer size={22} />} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CardDash;
