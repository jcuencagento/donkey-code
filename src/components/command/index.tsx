import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { BiBox, BiMessageSquareEdit, BiPlayCircle, BiTrophy, BiInfoCircle, BiTerminal } from "react-icons/bi";
import { BsGithub } from "react-icons/bs";
import { Command, CommandInput, CommandList, CommandOption } from "superkey";

const data = [
    {
        id: 1,
        name: "Type now",
        href: "/",
        icon: <BiPlayCircle />,
    },
    {
        id: 2,
        name: "Dashboard",
        href: "/dash",
        icon: <BiBox />,
    },
    {
        id: 3,
        name: "Information",
        href: "/info",
        icon: <BiInfoCircle />,
    },
    {
        id: 4,
        name: "Leaderboard",
        href: "/classification",
        icon: <BiTrophy />,
    },
    {
        id: 5,
        name: "Report a bug",
        href: "https://github.com/jcuencagento/donkey-code/issues/new",
        icon: <BiMessageSquareEdit />,
    },
    {
        id: 6,
        name: "Repository",
        href: "https://github.com/jcuencagento/donkey-code",
        icon: <BsGithub />,
    },
    {
        id: 7,
        name: "Terms & Conditions",
        href: "/privacy",
        icon: <BiTerminal />,
    },
];

const CommandMenu = () => {
    const [value, setValue] = useState("");
    const [open, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        function handleKeyDown(event?: KeyboardEvent) {
            if (event?.key === "k" && (event?.metaKey || event?.ctrlKey)) {
                event?.preventDefault();
                setOpen(!open);
            }
        }

        if (typeof window !== "undefined") {
            window.addEventListener("keydown", handleKeyDown);
            return () => {
                window.removeEventListener("keydown", handleKeyDown);
            };
        }
    }, [open]);

    const filteredData = data.filter((doc) => {
        return doc.name?.toLowerCase().includes(value.toLowerCase());
    });

    return (
        <>
            <Command
                open={open}
                onClose={() => {setOpen(!open)}}
                commandFunction={(action) => {
                    setOpen(false);
                    router.push(`${action}`);
                }}
                className="border border-neutral-800 bg-background text-primary"
                overlayClassName="bg-background/50">
                <CommandInput
                    placeholder="Search..."
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                    className="border-b border-neutral-800 bg-background text-primary" />
                <CommandList className="border-none">
                    {filteredData.map((action) => (
                        <CommandOption
                            key={action.id}
                            value={action.href || ""}
                            activeClassName="bg-gray-300 dark:bg-zinc-700/25"
                        >
                            <div className="flex items-center space-x-3 py-1 px-1">
                                <div className="icon-size-8 flex-shrink-0 text-primary">{action.icon}</div>
                                <h1 className="text-gray-100 text-primary">{action.name}</h1>
                            </div>
                        </CommandOption>
                    ))}
                </CommandList>
            </Command>
        </>
    );
};

export default CommandMenu;
