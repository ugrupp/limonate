import type { InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import data from "../data/index.json";

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
      <section dangerouslySetInnerHTML={{ __html: data.intro }}></section>
      <section>
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
      <section>
        <Link href="/impressum">
          <a>Impressum</a>
        </Link>
      </section>
    </>
  );
};

export default Home;
