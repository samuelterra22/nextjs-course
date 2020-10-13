import GlobalStyle from "@/styles/GlobalStyle";
import React from "react";

export default function App({Component, pageProps}) {
    return (<>
        <GlobalStyle />
        <Component {...pageProps} />
    </>)
}
