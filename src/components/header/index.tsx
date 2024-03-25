import Link from "next/link";
import { BiTrophy, BiInfoCircle } from "react-icons/bi";
import Auth from "@/components/auth";
import IconButton from "@/ui/iconButton";
import CommandMenu from "../command";
import ThemeSwitch from "../theme-switch";

const Header = () => {
    return (
        <header className="sticky top-0 z-40 w-full py-4 bg-midnight duration-300">
            <div className="flex container pl-4 pr-4 items-center justify-between mx-auto">
                <Link aria-label="Home" href="/">
                    <div className="flex items-center cursor-pointer transition-all">
                        <img src="/img/logo.webp" alt="Logo" className="w-8 h-8 lg:w-12 lg:h-12 rounded-lg" />
                        <h1 className="xl:text-3xl text-xl font-bold text-primary hover:text-primary/80 ml-2 mr-2">Donkey Code</h1>
                    </div>
                </Link>
                <div className="flex items-center space-x-2 xl:space-x-6">
                    <Auth />
                    <Link aria-label="Info" href="/info">
                        <IconButton className="bg-transparent text-primary" aria-label="Info" icon={<BiInfoCircle size={24} />} />
                    </Link>
                    <ThemeSwitch />
                    <Link aria-label="Leaderboard" href="/classification">
                        <IconButton className="bg-transparent text-primary" aria-label="Leaderboard" icon={<BiTrophy size={24} />} />
                    </Link>
                    <CommandMenu />
                </div>
            </div>
        </header>
    );
};

export default Header;
