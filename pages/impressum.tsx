import { InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import React from "react";
import Page from "../components/page";
import data from "../data/imprint.json";
import richtextStyles from "../styles/richtext.module.css";

export const getStaticProps = async () => {
  return {
    props: {
      data,
    },
  };
};

const Imprint: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  data,
}) => {
  return (
    <>
      <Head>
        <title>{data.title} | Limonate</title>
      </Head>

      <Page
        col1Content={
          <>
            <h1 className="text-16 md:text-20 2xl:text-25 leading-tight uppercase mb-[1.25em]">
              {data.title}
            </h1>

            <h2 className="text-16 md:text-20 2xl:text-25 leading-tight uppercase mb-[1.25em]">
              {data.col1.intro}
            </h2>

            <div
              className={[
                richtextStyles.root,
                "font-serif text-25 md:text-40 xl:text-35 2xl:text-55 leading-none",
              ].join(" ")}
              dangerouslySetInnerHTML={{ __html: data.col1.text }}
            ></div>
          </>
        }
        col2Content={
          <div
            className={[
              richtextStyles.root,
              "text-16 md:text-20 2xl:text-25 leading-tight",
            ].join(" ")}
            dangerouslySetInnerHTML={{ __html: data.col2.text }}
          />
        }
      />
    </>
  );
};

export default Imprint;
