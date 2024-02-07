import Image from "next/image";

import donkey_code from "../assets/images/donkey-code-hd.png";

import Auth from "./auth";

export default function Header() {
    return (
        <header className="align-center flex justify-between">
            <div className="m-auto flex gap-4 p-4 text-4xl font-bold leading-[4rem] tracking-tight">
                <Image alt="Donkey Code logo" height={90} src={donkey_code} width={160} />
                Donkey Code
            </div>
            <div className="m-auto flex gap-4 text-4xl font-bold">
                <Auth />
            </div>
        </header>
    );
}
