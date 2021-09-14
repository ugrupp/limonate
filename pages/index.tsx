import type { InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import About from "../components/about";
import Gallery from "../components/gallery";
import Menu from "../components/menu";
import Shop from "../components/shop";
import data from "../data/index.json";
import shopData from "../data/shop.json";
import client from "../lib/client";
import scrollsnapStyles from "../styles/scrollsnap.module.css";

export const getStaticProps = async () => {
  const products = await client.product.fetchAll();

  return {
    props: {
      data,
      shopData,
      products: JSON.parse(JSON.stringify(products)),
    },
  };
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  data,
  shopData,
  products,
}) => {
  return (
    <>
      <Head>
        <title>Limonate</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={scrollsnapStyles.wrapper}>
        {/* Intro */}
        <section className={scrollsnapStyles.section} id="start">
          <div className="flex items-center justify-center h-screen xl:h-full">
            <Menu />
          </div>
        </section>

        {/* About */}
        <About text={data.about} />

        {/* Gallery */}
        <Gallery gallery={data.gallery} />

        {/* Signet */}
        <section className={scrollsnapStyles.section}>
          <div className="flex items-center justify-center h-screen xl:h-full">
            <img
              className="max-w-full w-[150px] md:w-[275px] 3xl:w-[390px]"
              src="/images/limonate-signet.svg"
              alt="Limonate"
            />
          </div>
        </section>

        {/* Shop */}
        <Shop data={shopData} products={products} />

        {/* Info */}
        <section className={scrollsnapStyles.section} id="info">
          <Link href="/impressum">
            <a>Impressum</a>
          </Link>
        </section>
      </div>
    </>
  );
};

export default Home;
