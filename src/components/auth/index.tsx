/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
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
    const [mobile, setMobile] = useState(false);

    useEffect(() => {
        setMobile(window.innerWidth < 620);
    }, []);

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
            <Button aria-label="Loading" className="bg-transparent ml-2 text-primary" disabled isLoading loadingText="Loading..." />
        );
    }

    if (status === "unauthenticated") {
        return <LinkRoute aria-label="Auth" className="text-primary hover:text-orange-400" href="/auth">Sign in</LinkRoute>;
    }

    const avatar_image = "/img/avatar.png";
    return (
        <Dropdown
            title={session?.user?.username}
            className="bg-transparent text-primary"
            icon={<img src={session?.user?.image || avatar_image} alt="Avatar" height={!mobile ? 28 : 82} width={!mobile ? 28 : 82} style={{ borderRadius: '50%' }} />}
        >
            <Link aria-label="Type now" href="/">
                <DropdownItem className="bg-background hover:bg-gray-500 text-primary" icon={<BiPlayCircle className="text-primary" size={17} />}>
                    <p className="text-primary">Type now</p>
                </DropdownItem>
            </Link>
            <Link aria-label="Dashboard" href="/dash">
                <DropdownItem className="bg-background hover:bg-gray-500 text-primary" icon={<BiBox className="text-primary" size={17} />}>
                    <p className="text-primary">Dashboard</p>
                </DropdownItem>
            </Link>
            <a aria-label="Report a bug" href="https://github.com/jcuencagento/donkey-code/issues/new" target="_blank" rel="noreferrer">
                <DropdownItem className="bg-background hover:bg-gray-500 text-primary" icon={<BiMessageSquareEdit className="text-primary" size={17} />} external={true}>
                    <p className="text-primary">Report a bug</p>
                </DropdownItem>
            </a>
            <DropdownItem className="bg-background hover:bg-gray-500 text-primary" icon={<BiExit className="text-primary" size={17} />} onClick={handleLogout}>
                <p className="text-primary">Sign out</p>
            </DropdownItem>
        </Dropdown>
    );
};

export default Auth;
