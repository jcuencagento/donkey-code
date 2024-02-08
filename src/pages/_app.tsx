import type { AppType } from "next/dist/shared/lib/utils";
import type { Session } from "next-auth";
import { Analytics } from '@vercel/analytics/react';

// tRPC =>
import { trpc } from "@/utils/trpc";

// Auth =>
import { SessionProvider } from "next-auth/react";

// Styles =>
import "@/styles/globals.css";
import "superkey/styles.css";
import Show from "@/motions/show";
import { Toaster } from "react-hot-toast";

// Layout =>
import Layout from "@/layout";

/*// SEO =>
import { DefaultSeo } from "next-seo";
import nextSeoConfig from "next-seo.config";
<DefaultSeo {...nextSeoConfig} />*/

// Next progress =>
import NextNProgress from "nextjs-progressbar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
  router,
}) => {
  return (
    <>
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
            {/* @ts-expect-error Server Component */}
            <Component {...pageProps} />
          </Show>
        </Layout>
      </SessionProvider>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Analytics />
    </>
  );
};

export default trpc.withTRPC(MyApp);
