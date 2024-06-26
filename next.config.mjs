import { env } from "./src/env/server.mjs";

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
    return config;
}

export default defineNextConfig({
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [
            'media.giphy.com'
        ],
    },
    i18n: {
        locales: ["en"],
        defaultLocale: "en",
    },
    /* Warn, this just for 1st build */
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
      },
});
