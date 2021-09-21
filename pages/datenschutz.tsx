import { InferGetStaticPropsType, NextPage } from "next";
import React from "react";
import Page from "../components/page";
import data from "../data/privacy.json";
import richtextStyles from "../styles/richtext.module.css";

export const getStaticProps = async () => {
  return {
    props: {
      data,
    },
  };
};

const Privacy: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  data,
}) => {
  return (
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
        <div
          className={[
            richtextStyles.root,
            "text-16 md:text-20 2xl:text-25 leading-tight",
          ].join(" ")}
          dangerouslySetInnerHTML={{ __html: data.col2.text }}
        />
      }
    />
  );
};

export default Privacy;