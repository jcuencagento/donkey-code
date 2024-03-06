"use client";

import {AnimatePresence, motion} from "framer-motion";
import {Moon, Sun} from "lucide-react";
import {useTheme} from "next-themes";
import {useEffect, useState} from "react";

export default function ThemeSwitch() {
    const {setTheme, resolvedTheme} = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    function onThemeChange() {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    }

    return (
        <div className="flex items-center justify-center hover:scale-110">
            <button
                aria-label="Switch theme"
                className="text-primary bg-transparent flex flex-col items-center justify-center overflow-hidden rounded-md font-medium duration-200 ease-in-out sm:p-4"
                type="button"
                onClick={onThemeChange}
            >
                <AnimatePresence mode="wait">
                    {resolvedTheme === "light" && (
                        <motion.span key="theme1" animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -10}} initial={{opacity: 0, y: 10}}>
                            <Moon size={22} />
                        </motion.span>
                    )}
                    {resolvedTheme === "dark" && (
                        <motion.span key="theme2" animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -10}} initial={{opacity: 0, y: 10}}>
                            <Sun size={22} />
                        </motion.span>
                    )}
                </AnimatePresence>
            </button>
        </div>
    );
}
