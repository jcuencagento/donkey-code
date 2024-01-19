import Image from "next/image";

import donkey_code from "../assets/images/donkey-code-hd.png";

export default function Header() {
    return (
        <header className="mt-4 flex gap-4 text-4xl font-bold leading-[4rem] tracking-tight">
            <Image alt="Donkey Code logo" height={90} src={donkey_code} width={160} />
            Donkey Code
        </header>
    );
}
