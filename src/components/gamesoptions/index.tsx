import { Dropdown, DropdownItem } from "@/ui/dropdown";
import { TbBrandJavascript, TbBrandPython } from "react-icons/tb";
import { RiEnglishInput  } from "react-icons/ri";
import { GiSpain } from "react-icons/gi";
import { BsAirplane, BsAlarm, BsCarFront, BsKeyboard, BsRocketTakeoff, BsScooter, BsChatRightQuote } from "react-icons/bs";

const GamesOptions = ({ gameType, gameDuration, setGameType, setGameDuration, isTyping }) => {
    if (isTyping) {
        return(
            <div className="flex w-full align-center justify-between lg:justify-around m-auto mt-8 mb-10 lg:mb-16"></div>
        );
    }
    return (
        <div className="flex w-full align-center justify-between lg:justify-around m-auto mt-2 mb-4 lg:mb-10">
            <Dropdown title={`${gameDuration} seconds`} className="bg-transparent text-xs lg:text-lg" icon={ <BsAlarm size={26} /> }>
                <DropdownItem icon={<BsRocketTakeoff size={17} />} onClick={() => setGameDuration(30)}>
                    30 seconds
                </DropdownItem>
                <DropdownItem icon={<BsAirplane size={17} />} onClick={() => setGameDuration(45)}>
                    45 seconds
                </DropdownItem>
                <DropdownItem icon={<BsCarFront size={17} />} onClick={() => setGameDuration(60)}>
                    60 seconds
                </DropdownItem>
                <DropdownItem icon={<BsScooter size={17} />} onClick={() => setGameDuration(120)}>
                    120 seconds
                </DropdownItem>
            </Dropdown>
            <Dropdown title={`Type ${gameType}`} className="bg-transparent text-xs lg:text-lg" icon={ <BsKeyboard size={30} /> }>
                <DropdownItem icon={<TbBrandJavascript size={17} />} onClick={() => setGameType('JavaScript')}>
                    JavaScript
                </DropdownItem>
                <DropdownItem icon={<TbBrandPython size={17} />} onClick={() => setGameType('Python')}>
                    Python
                </DropdownItem>
                <DropdownItem icon={<RiEnglishInput size={17} />} onClick={() => setGameType('English')}>
                    English
                </DropdownItem>
                <DropdownItem icon={<GiSpain size={17} />} onClick={() => setGameType('Spanish')}>
                    Español
                </DropdownItem>
                <DropdownItem icon={<BsChatRightQuote size={17} />} onClick={() => setGameType('Quotes')}>
                    Quotes
                </DropdownItem>
            </Dropdown>
        </div>
    );
};

export default GamesOptions;