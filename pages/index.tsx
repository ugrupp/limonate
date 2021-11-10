import cloneDeepWith from "lodash.clonedeepwith";
import type { InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSetRecoilState } from "recoil";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import About from "../components/about";
import Gallery from "../components/gallery";
import Info from "../components/info";
import Menu from "../components/menu";
import Shop from "../components/shop";
import Signet from "../components/signet";
import data from "../data/index.json";
import shopData from "../data/shop.json";
import { clientUnoptimized } from "../lib/client";
import { pageScrolledState } from "../lib/state";
import scrollsnapStyles from "../styles/scrollsnap.module.css";

export const getStaticProps = async () => {
  // Query all products
  const products = await clientUnoptimized.product.fetchAll();

  // Query for product meta fields
  const productsMetaQuery = clientUnoptimized.graphQLClient.query(
    (root: any) => {
      root.addConnection(
        "products",
        { args: { first: 99 } },
        (product: any) => {
          product.add("title");
          product.add("id");
          product.addConnection(
            "metafields",
            { args: { namespace: "my_fields", first: 99 } },
            (meta: any) => {
              meta.add("id");
              meta.add("key");
              meta.add("value");
              meta.add("namespace");
            }
          );
        }
      );
    }
  );

  let { data: productsMetaData } = await clientUnoptimized.graphQLClient.send(
    productsMetaQuery
  );

  // Transform metafields markdown into html
  productsMetaData = cloneDeepWith(
    JSON.parse(JSON.stringify(productsMetaData)),
    (value, key) => {
      // Check if we're looking at a meta field
      if (key === "node" && value?.namespace === "my_fields") {
        // Check if it's a field we should transform
        if (!!value?.key?.endsWith("__md")) {
          return {
            ...value,
            value: String(
              remark().use(remarkHtml).use(remarkGfm).processSync(value.value)
            ),
          };
        }
      }
    }
  );

  return {
    props: {
      data,
      shopData,
      products: JSON.parse(JSON.stringify(products)),
      productsMetaData,
    },
  };
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  data,
  shopData,
  products,
  productsMetaData,
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
            <h1 className="sr-only">Limonate</h1>

            <Menu withIntro={true} />
          </div>
        </section>

        {/* About */}
        <About text={data.about} />

        {/* Gallery */}
        <Gallery gallery={data.gallery} />

        {/* Signet */}
        <Signet />

        {/* Shop */}
        <Shop
          data={shopData}
          products={products}
          productsMetaData={productsMetaData?.products?.edges}
        />

        {/* Info */}
        <Info data={data.info} />
      </div>
    </>
  );
};

export default Home;
