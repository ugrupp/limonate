import { InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSetRecoilState } from "recoil";
import Container from "../components/container";
import { Gradient, Sentinel } from "../components/scroll-gradient";
import data from "../data/imprint.json";
import { pageScrolledState } from "../lib/state";
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
  // Set scroll state to show topbar
  const setPageScrolledState = useSetRecoilState(pageScrolledState);
  useEffect(() => {
    setPageScrolledState(true);
  }, []);

  const { ref: topSentinelRef, inView: topSentinelInView } = useInView({
    threshold: 0,
  });
  const { ref: bottomSentinelRef, inView: bottomSentinelInView } = useInView({
    threshold: 0,
  });

  return (
    <Container>
      <div className="grid xl:grid-cols-2 gap-y-60 md:gap-y-90 gap-x-40 2xl:gap-x-60">
        {/* Col 1 */}
        <div className="h-screen overflow-y-auto">
          <div className="py-15 md:py-40 xl:py-60 3xl:py-90">
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
        </div>

        {/* Col 2 */}
        <div className="h-screen overflow-y-auto">
          <div className="relative">
            {/* Scroll gradient & sentinel */}
            <Sentinel position="top" ref={topSentinelRef} />
            <Gradient
              position="top"
              visible={topSentinelInView}
              dimensions="h-120 -mb-120"
            />

            {/* Content */}
            <div className="py-15 md:py-40 xl:py-60 3xl:py-90">
              <div
                className={[
                  richtextStyles.root,
                  "text-16 md:text-20 2xl:text-25 leading-tight",
                ].join(" ")}
                dangerouslySetInnerHTML={{ __html: data.col2.text }}
              ></div>
            </div>

            {/* Scroll gradient & sentinel */}
            <Gradient position="bottom" visible={bottomSentinelInView} />
            <Sentinel position="bottom" ref={bottomSentinelRef} />
          </div>
        </div>
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>
    </Container>
  );
};

export default Imprint;
