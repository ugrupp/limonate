import { InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import React from "react";
import Page from "../components/page";
import data from "../data/widerruf.json";
import richtextStyles from "../styles/richtext.module.css";

export const getStaticProps = async () => {
  return {
    props: {
      data,
    },
  };
};

const Widerruf: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
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
          <div className="bg-dark text-light selection-inverted p-15 md:p-20 2xl:p-30 rounded-[15px] md:rounded-[20px] 2xl:rounded-[30px]">
            <div
              className={[
                richtextStyles.root,
                "text-16 md:text-20 2xl:text-25 leading-tight",
              ].join(" ")}
              dangerouslySetInnerHTML={{ __html: data.col2.text }}
            />
          </div>
        }
      />
    </>
  );
};

export default Widerruf;
