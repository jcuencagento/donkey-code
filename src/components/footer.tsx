"use client";

import {GitHubLogoIcon, LinkedInLogoIcon, IdCardIcon, LockClosedIcon, CodeIcon} from "@radix-ui/react-icons";

import {Button} from "@/components/ui/button";

export default function Footer() {
    const github_URL = "https://github.com/jcuencagento";
    const linkedin_URL = "https://www.linkedin.com/in/javiercuencagento/";
    const code_URL = "https://github.com/jcuencagento/code-me-fast";

    return (
        <footer className="flex justify-between text-center leading-[4rem] opacity-70">
            <div>
                <Button
                    variant="ghost"
                    onClick={() => {
                        window.open(linkedin_URL, "_blank");
                    }}
                >
                    <IdCardIcon className="mr-2 h-4 w-4" /> Contact
                </Button>
                <Button
                    variant="ghost"
                    onClick={() => {
                        window.open(linkedin_URL, "_blank");
                    }}
                >
                    <LockClosedIcon className="mr-2 h-4 w-4" /> Terms
                </Button>
                <Button
                    variant="ghost"
                    onClick={() => {
                        window.open(code_URL, "_blank");
                    }}
                >
                    <CodeIcon className="mr-2 h-4 w-4" /> Code
                </Button>
            </div>
            <p>Javier Cuenca Gento © {new Date().getFullYear()} Donkey Code</p>
            <div>
                <Button
                    variant="ghost"
                    onClick={() => {
                        window.open(linkedin_URL, "_blank");
                    }}
                >
                    <LinkedInLogoIcon className="mr-2 h-4 w-4" /> Linkedin
                </Button>
                <Button
                    variant="ghost"
                    onClick={() => {
                        window.open(github_URL, "_blank");
                    }}
                >
                    <GitHubLogoIcon className="mr-2 h-4 w-4" /> GitHub
                </Button>
            </div>
        </footer>
    );
}
