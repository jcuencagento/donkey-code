const nextSeoConfig = {
    title: "Donkey Code",
    titleTemplate: "%s - Type",
    description: "Typing test and game interactive and persistent",
    defaultTitle: "Donkey Code",
    additionalLinkTags: [
        {
            rel: "icon",
            href: "/img/favicon.ico",
        },
        {
            rel: "manifest",
            href: "/manifest.json",
        },
        {
            rel: "preload",
            href: "/fonts/inter.woff2",
            as: "font",
            type: "font/woff2",
            crossOrigin: "anonymous",
        },
    ],
    openGraph: {
        site_name: "donkey-code",
        description: "Typing test and game interactive and persistent",
        url: "https://donkey-code.vercel.app/",
        type: "website",
        locale: "en_IE",
        images: [
                {
                    url: "/img/banner.jpg",
                    width: 1920,
                    height: 1080,
                    type: "image/jpg",
                },
        ],
    }
};

export default nextSeoConfig;
