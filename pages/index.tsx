import type { InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect } from "react";
import { useInView, InView } from "react-intersection-observer";
import { useSetRecoilState } from "recoil";
import About from "../components/about";
import Gallery from "../components/gallery";
import Info from "../components/info";
import Menu from "../components/menu";
import Shop from "../components/shop";
import data from "../data/index.json";
import shopData from "../data/shop.json";
import client from "../lib/client";
import { pageScrolledState } from "../lib/state";
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
  // Set scroll status to global state
  const { ref: topSentinelRef, inView: topSentinelInView, entry } = useInView();

  const setPageScrolledState = useSetRecoilState(pageScrolledState);
  useEffect(() => {
    if (entry) {
      setPageScrolledState(!topSentinelInView);
    }
  }, [topSentinelInView, entry]);

  return (
    <>
      <Head>
        <title>Limonate</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={scrollsnapStyles.wrapper}>
        {/* Intro */}
        <section className={`${scrollsnapStyles.section} relative`} id="start">
          {/* Top sentinel to check if page is scrolled */}
          <div
            className="absolute top-0 inset-x-0 h-px pointer-events-none"
            ref={topSentinelRef}
          />

          {/* Content */}
          <div className="flex items-center justify-center h-screen xl:h-full">
            <Menu withIntro={true} />
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
        <Info data={data.info} />
      </div>
    </>
  );
};

export default Home;
