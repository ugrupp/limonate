import type { InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Intro from "../components/intro";
import data from "../data/index.json";
import scrollsnapStyles from "../styles/scrollsnap.module.css";

export const getStaticProps = async () => {
  return {
    props: {
      data,
    },
  };
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  data,
}) => {
  return (
    <>
      <Head>
        <title>Limonate</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={scrollsnapStyles.wrapper}>
        <Intro text={data.intro} />

        <section className={scrollsnapStyles.section} data-anchor="#was">
          <h2>Gallery</h2>
          <div className="w-[900px] max-w-full relative">
            {data.gallery.map(({ image }) => (
              <Image
                quality={85}
                layout="responsive"
                key={image.src}
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
              />
            ))}
          </div>
        </section>

        <section className={scrollsnapStyles.section}>
          <div className="flex items-center justify-center h-screen xl:h-full">
            <img
              className="max-w-full w-[150px] md:w-[275px] 3xl:w-[390px]"
              src="/images/limonate-signet.svg"
              alt="Limonate"
            />
          </div>
        </section>

        <section className={scrollsnapStyles.section} data-anchor="#shop">
          Shop
        </section>

        <section className={scrollsnapStyles.section} data-anchor="#info">
          <Link href="/impressum">
            <a>Impressum</a>
          </Link>
        </section>
      </div>
    </>
  );
};

export default Home;
