import React from "react";
import { useInView } from "react-intersection-observer";
import richtextStyles from "../styles/richtext.module.css";
import scrollsnapStyles from "../styles/scrollsnap.module.css";
import Container from "./container";
import { Gradient, Sentinel } from "./scroll-gradient";

interface IntroProps {
  text: string;
}

const Intro: React.FC<IntroProps> = ({ text }) => {
  const { ref: topSentinelRef, inView: topSentinelInView } = useInView({
    threshold: 0,
  });
  const { ref: bottomSentinelRef, inView: bottomSentinelInView } = useInView({
    threshold: 0,
  });

  return (
    <section
      className={`${scrollsnapStyles.section} relative`}
      data-anchor="#wer"
    >
      <div className={scrollsnapStyles.scroller}>
        {/* Content */}
        <div className="relative">
          {/* Scroll gradient & sentinel */}
          <Sentinel position="top" ref={topSentinelRef} />
          <Gradient
            position="top"
            visible={topSentinelInView}
            dimensions="h-120 -mb-120"
          />

          {/* Content */}
          <div className="pt-15 pb-120 md:pt-40 md:pb-240 xl:py-60 3xl:py-90">
            <Container>
              <div
                className={[
                  richtextStyles.root,
                  "font-serif text-25 md:text-40 xl:text-50 2xl:text-75 leading-none",
                ].join(" ")}
                dangerouslySetInnerHTML={{ __html: text }}
              ></div>
            </Container>
          </div>

          {/* Scroll gradient & sentinel */}
          <Gradient
            position="bottom"
            visible={bottomSentinelInView}
            dimensions="h-120 -mb-120"
          />
          <Sentinel position="bottom" ref={bottomSentinelRef} />
        </div>
      </div>
    </section>
  );
};

export default Intro;
