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
                <Link href="/">
                <div className="flex items-center cursor-pointer text-white hover:text-gray-300 transition-all">
                    <img src="/img/logo.png" alt="Logo" className="w-12 h-12 rounded-lg" />
                    <h1 className="text-2xl ml-2 mr-2">Donkey Code</h1>
                </div>
                </Link>
                <div className="flex items-center space-x-6">
                <Auth />
                <Link href="/classification">
                    <IconButton icon={<BiTrophy size={22} />} />
                </Link>
                <Theme />
                <CommandMenu />
                <a href="https://github.com/jcuencagento/donkey-code" rel="noreferrer" target="_blank">
                    <IconButton icon={<BiCodeAlt size={22} />} />
                </a>
                </div>
            </div>
        </header>
    );
};

export default Header;
