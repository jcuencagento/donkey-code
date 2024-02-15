import Link from "next/link";
import { BiTrophy, BiCodeAlt } from "react-icons/bi";
import Auth from "@/components/auth";
import IconButton from "@/ui/iconButton";
import CommandMenu from "../command";
import Theme from "../theme";

const Header = () => {
    return (
        <header className="sticky top-0 z-40 w-full py-4 bg-midnight duration-300">
            <div className="flex container pl-4 pr-4 md:pl-0 md:pr-0 items-center justify-between mx-auto">
                <Link aria-label="Home" href="/">
                    <div className="flex items-center cursor-pointer text-white hover:text-gray-300 transition-all">
                        <img src="/img/logo.webp" alt="Logo" className="w-12 h-12 rounded-lg" />
                        <h1 className="text-3xl font-bold text-gray-200 ml-2 mr-2">Donkey Code</h1>
                    </div>
                </Link>
                <div className="flex items-center space-x-6">
                    <Auth />
                    <Link aria-label="Leaderboard" href="/classification">
                        <IconButton aria-label="Leaderboard" icon={<BiTrophy size={24} />} />
                    </Link>
                    <Theme />
                    <CommandMenu />
                    <a aria-label="Open code" href="https://github.com/jcuencagento/donkey-code" rel="noreferrer" target="_blank">
                        <IconButton aria-label="Open code" icon={<BiCodeAlt size={26} />} />
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;
