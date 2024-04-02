import type { AppType } from "next/dist/shared/lib/utils";
import type { Session } from "next-auth";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next";

// tRPC =>
import { trpc } from "@/utils/trpc";

// Auth =>
import { SessionProvider } from "next-auth/react";

// Styles =>
import "@/styles/globals.css";
import 'rsuite/dist/rsuite-no-reset.min.css';
import "superkey/styles.css";
import Show from "@/motions/show";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/theme-provider";
import { CustomProvider } from 'rsuite';

// Layout =>
import Layout from "@/layout";
import Image from "next/image";
import gradientImg from "../../public/img/gradient.webp";

// SEO =>
import { DefaultSeo } from "next-seo";
import nextSeoConfig from "next-seo.config";

// Next progress =>
import NextNProgress from "nextjs-progressbar";

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
    router,
}) => {
    return (
        <ThemeProvider disableTransitionOnChange enableSystem attribute="class" defaultTheme="system">
            <NextNProgress
                color="#979797"
                startPosition={0.3}
                stopDelayMs={200}
                height={2}
                showOnShallow={true}
            />
            <SessionProvider session={session}>
                <Layout>
                    <Show routerKey={router.route}>
                        <Component {...pageProps} />
                    </Show>
                </Layout>
            </SessionProvider>
            <DefaultSeo {...nextSeoConfig} />
            <Toaster position="bottom-center" reverseOrder={false} />
            <Analytics />
            <SpeedInsights />
            <Image
                priority
                alt="Gradient background"
                className="fixed left-0 top-0 z-[-10] w-full h-full object-cover"
                src={gradientImg}
            />
        </ThemeProvider>
    );
};

export default trpc.withTRPC(MyApp);
