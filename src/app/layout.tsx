import type {Metadata} from "next";

import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
    title: "Donkey Code",
    description: "Coding and typing speed and trust test.",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang="en">
            <body className="dark container m-auto grid min-h-screen grid-rows-[auto,1fr,auto] bg-background px-4 font-sans antialiased">
                <Header />
                <main className="py-8">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
