import NextAuth, { type NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

// Prisma adapter for NextAuth =>
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/server/db/client";
import { env } from "@/env/server.mjs";

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: env.GITHUB_ID || "",
            clientSecret: env.GITHUB_CLIENT_SECRET || "",
            profile(profile) {
                const profile_sent = {
                    id: profile.id.toString(),
                    name: profile.name || profile.login,
                    username: profile.login,
                    email: profile.email,
                    image: profile.avatar_url,
                };

                return profile_sent;
            },
        }),
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID || "",
            clientSecret: env.GOOGLE_CLIENT_SECRET || "",
            profile(profile) {
                const profile_sent = {
                    id: profile.sub,
                    name: profile.name || profile.email.replace('@gmail.com', ''),
                    username: profile.email.replace('@gmail.com', ''),
                    email: profile.email,
                    emailVerified: profile.email_verified,
                    image: profile.picture,
                };

                return profile_sent;
            },
        }),
    ],
    secret: env.NEXTAUTH_SECRET || "",
    adapter: PrismaAdapter(prisma),
    callbacks: {
        session: ({ session, user }) => ({
            ...session,
            user: {
                ...session.user,
                id: user.id,
                username: user.username,
            },
        }),
    },
};

export default NextAuth(authOptions);
