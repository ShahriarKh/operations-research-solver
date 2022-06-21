import Document, { Html, Head, Main, NextScript } from "next/document";
// import DarkReaderMin from "../public/darkReader.min.js"

// <Head> isn't same as the <Head> inside pages (!= next/head)!
// Don't forget jsx naming style (char-set => charSet)
// title and viewport meta tags shouldn't be here

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en-US">
                <Head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="X-UA-Compatible" conent="ie=edge" />
                    <link
                        rel="stylesheet"
                        href="https://unpkg.com/@tabler/icons@latest/iconfont/tabler-icons.min.css"
                    ></link>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
