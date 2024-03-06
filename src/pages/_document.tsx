import NextDocument, { Html, Head, Main, NextScript } from "next/document";

export default class Document extends NextDocument {
    render() {
        return (
            <Html lang="en">
                <Head />
                <body suppressHydrationWarning className="bg-midnight text-primary text-custom font-sans">
                    <Main />
                    <NextScript />
                    <noscript>
                        <p className="mx-auto bg-yellow-100 p-2 text-center">
                            JavaScript is disabled. Some functionalities might not work properly.
                        </p>
                    </noscript>
                </body>
            </Html>
        );
    }
}
