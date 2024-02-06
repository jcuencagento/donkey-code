"use client";

import {GitHubLogoIcon, LinkedInLogoIcon, CodeIcon} from "@radix-ui/react-icons";

import {Button} from "@/components/ui/button";

import Contact from "./contact";
import Terms from "./terms";

export default function Footer() {
    const github_URL = "https://github.com/jcuencagento";
    const linkedin_URL = "https://www.linkedin.com/in/javiercuencagento/";
    const code_URL = "https://github.com/jcuencagento/donkey-code";

    return (
        <footer className="flex justify-between text-center leading-[4rem] opacity-70">
            <div>
                <Contact />
                <Terms />
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
