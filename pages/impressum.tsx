import { InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import React from "react";
import data from "../data/imprint.json";

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
      <div>{data.alpha.text}</div>

      <Link href="/">
        <a>Home</a>
      </Link>
    </>
  );
};

export default Imprint;
