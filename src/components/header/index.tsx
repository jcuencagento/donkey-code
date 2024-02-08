import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import Auth from "@/components/auth";
import IconButton from "@/ui/iconButton";
import CommandMenu from "../command";

const Header = () => {
    return (
        <header className="sticky top-0 z-40 w-full py-4 bg-midnight duration-300">
            <div className="flex container pl-4 pr-4 md:pl-0 md:pr-0 items-center justify-between mx-auto">
                <Link href="/">
                <div className="flex items-center cursor-pointer text-white hover:text-gray-300 transition-all">
                    <img src="/img/icon-512x512.png" alt="Logo" className="w-8 h-8" />
                    <h1 className="text-xl ml-2 mr-2">Donkey Code</h1>
                </div>
                </Link>
                <div className="flex items-center space-x-6">
                <Auth />
                <CommandMenu />
                <a href="https://github.com/jcuencagento/donkey-code" rel="noreferrer" target="_blank">
                    <IconButton icon={<BsGithub size={20} />} />
                </a>
                </div>
            </div>
        </header>
    );
};

export default Header;
