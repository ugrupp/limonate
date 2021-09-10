import { InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import React from "react";
import data from "../data/imprint.json";
import richtextStyles from "../styles/richtext.module.css";
import Container from "../components/container";

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
    <Container>
      <div className="grid xl:grid-cols-2 gap-y-60 md:gap-y-90 gap-x-40 2xl:gap-x-60">
        {/* Col 1 */}
        <div>
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
        </div>

        {/* Col 2 */}
        <div>
          <div
            className={[
              richtextStyles.root,
              "text-16 md:text-20 2xl:text-25 leading-tight",
            ].join(" ")}
            dangerouslySetInnerHTML={{ __html: data.col2.text }}
          ></div>
        </div>
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>
    </Container>
  );
};

export default Imprint;
