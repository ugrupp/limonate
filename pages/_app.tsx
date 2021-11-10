import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { RecoilRoot } from "recoil";
import Layout from "../components/layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Head>
        <link rel="icon" href="/favicon.ico" />

        <meta
          name="description"
          content="Die Zitronenlimo mit natürlichem Koffein aus Mate und Guarana."
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="limonate" />
        <meta property="og:url" content="https://www.limonate.limo/" />
        <meta property="og:image" content="/images/limonate-share.png" />
        <meta
          property="og:description"
          content="Die Zitronenlimo mit natürlichem Koffein aus Mate und Guarana."
        />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}
export default MyApp;
