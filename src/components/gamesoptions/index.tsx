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
        <div className="flex w-full align-center justify-around m-auto mt-2 mb-4 lg:mb-10">
            <Dropdown title={`${gameDuration} seconds`} className="bg-transparent text-xs lg:text-lg text-primary" icon={ <BsAlarm size={26} /> }>
                <DropdownItem className="bg-background hover:bg-gray-500 text-primary" icon={<BsRocketTakeoff className="text-primary" size={17} />} onClick={() => setGameDuration(30)}>
                    <p className="text-primary">30 seconds</p>
                </DropdownItem>
                <DropdownItem className="bg-background hover:bg-gray-500 text-primary" icon={<BsAirplane className="text-primary" size={17} />} onClick={() => setGameDuration(45)}>
                    <p className="text-primary">45 seconds</p>
                </DropdownItem>
                <DropdownItem className="bg-background hover:bg-gray-500 text-primary" icon={<BsCarFront className="text-primary" size={17} />} onClick={() => setGameDuration(60)}>
                    <p className="text-primary">60 seconds</p>
                </DropdownItem>
                <DropdownItem className="bg-background hover:bg-gray-500 text-primary" icon={<BsScooter className="text-primary" size={17} />} onClick={() => setGameDuration(120)}>
                    <p className="text-primary">120 seconds</p>
                </DropdownItem>
            </Dropdown>
            <Dropdown title={`Type ${gameType}`} className="bg-transparent text-xs lg:text-lg text-primary" icon={ <BsKeyboard size={30} /> }>
                <DropdownItem className="bg-background hover:bg-gray-500 text-primary" icon={<TbBrandJavascript className="text-primary" size={17} />} onClick={() => setGameType('JavaScript')}>
                    <p className="text-primary">JavaScript</p>
                </DropdownItem>
                <DropdownItem className="bg-background hover:bg-gray-500 text-primary" icon={<TbBrandPython className="text-primary" size={17} />} onClick={() => setGameType('Python')}>
                    <p className="text-primary">Python</p>
                </DropdownItem>
                <DropdownItem className="bg-background hover:bg-gray-500 text-primary" icon={<RiEnglishInput className="text-primary" size={17} />} onClick={() => setGameType('English')}>
                    <p className="text-primary">English</p>
                </DropdownItem>
                <DropdownItem className="bg-background hover:bg-gray-500 text-primary" icon={<GiSpain className="text-primary" size={17} />} onClick={() => setGameType('Spanish')}>
                    <p className="text-primary">Spanish</p>
                </DropdownItem>
                <DropdownItem className="bg-background hover:bg-gray-500 text-primary" icon={<BsChatRightQuote className="text-primary" size={17} />} onClick={() => setGameType('Quotes')}>
                    <p className="text-primary">Quotes</p>
                </DropdownItem>
            </Dropdown>
        </div>
    );
};

export default GamesOptions;