import type {Metadata} from "next";

import "./globals.css";
import Footer from "@/components/footer";

export const metadata: Metadata = {
    title: "Donkey Code",
    description: "Coding and typing speed and trust test.",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang="en">
            <body className="dark container m-auto grid min-h-screen grid-rows-[auto,1fr,auto] bg-background px-4 font-sans antialiased">
                <header className="text-xl font-bold leading-[4rem]">Donkey Code</header>
                <main className="py-8">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
