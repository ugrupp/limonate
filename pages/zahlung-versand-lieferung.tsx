import { InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import React from "react";
import Page from "../components/page";
import data from "../data/zahlung.json";
import richtextStyles from "../styles/richtext.module.css";

export const getStaticProps = async () => {
  return {
    props: {
      data,
    },
  };
};

const Zahlung: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
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
            <h1 className="sr-only">{data.title}</h1>

            <div
              className={[
                richtextStyles.root,
                "text-16 md:text-20 2xl:text-25 leading-tight",
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

export default Zahlung;
