/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { Button } from "@/ui";
import { signOut, useSession } from "next-auth/react";
import {
    BiBox,
    BiExit,
    BiMessageSquareEdit,
    BiPlayCircle
} from "react-icons/bi";
import Link from "next/link";
import toast from "react-hot-toast";
import { Dropdown, DropdownItem } from "@/ui/dropdown";
import LinkRoute from "@/ui/linkRoute";
import { toastStyles } from "@/styles/toast";

const Auth = () => {
    const { data: session, status } = useSession();
    const [disabled, setDisabled] = useState(false);
    const [closing, setClosing] = useState(false);

    const handleLogout = async () => {
        setDisabled(true);
        setClosing(true);
        try {
            await signOut({
                callbackUrl: "/",
            });
        } catch (error) {
            toast(
                "An error occurred while logout. Please create an issue about the problem.",
                {
                    icon: "🤔",
                    style: toastStyles,
                }
            );
        } finally {
            setDisabled(false);
            setClosing(false);
        }
    };

    if (status === "loading") {
        return (
            <Button className="ml-2" disabled isLoading loadingText="Loading..." />
        );
    }

    if (status === "unauthenticated") {
        return <LinkRoute href="/auth">Sign in</LinkRoute>;
    }

    const avatar_image = "/img/avatar.png";
    return (
        <Dropdown
            title={session?.user?.username}
            className="bg-transparent"
            icon={<img src={session?.user?.image || avatar_image} alt="Avatar" height={28} width={28} style={{ borderRadius: '50%' }} />}
        >
        <Link href="/dash">
            <DropdownItem icon={<BiPlayCircle size={17} />}>Type now</DropdownItem>
        </Link>
        <Link href="/dash">
            <DropdownItem icon={<BiBox size={17} />}>Dashboard</DropdownItem>
        </Link>
        <a href="https://github.com/jcuencagento/donkey-code/issues/new" target="_blank" rel="noreferrer">
            <DropdownItem icon={<BiMessageSquareEdit size={17} />} external={true}>
            Report a bug
            </DropdownItem>
        </a>
        <DropdownItem icon={<BiExit size={17} />} onClick={handleLogout}>
            Sign Out
        </DropdownItem>
        </Dropdown>
    );
};

export default Auth;
