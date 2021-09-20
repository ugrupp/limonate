import React, { useRef } from "react";
import scrollsnapStyles from "../styles/scrollsnap.module.css";
import richtextStyles from "../styles/richtext.module.css";
import Container from "./container";
import { Gradient, Sentinel } from "./scroll-gradient";
import { useInView } from "react-intersection-observer";
import data from "../data/index.json";
import Link from "next/link";
import Button from "./button";

interface InfoProps {
  data: typeof data.info;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const intersectionRoot = useRef<HTMLDivElement>(null);
  const { ref: topSentinelRef, inView: topSentinelInView } = useInView({
    root: intersectionRoot.current,
  });
  const { ref: bottomSentinelRef, inView: bottomSentinelInView } = useInView({
    root: intersectionRoot.current,
  });

  return (
    <section
      className={`${scrollsnapStyles.section} h-screen relative`}
      id="info"
    >
      {/* Content */}
      <div className="h-full overflow-y-auto" ref={intersectionRoot}>
        <Container
          className="min-h-full flex flex-col"
          classNameInner="relative flex-grow flex flex-col"
        >
          {/* Scroll gradient & sentinel */}
          <Sentinel position="top" ref={topSentinelRef} />
          <Gradient
            position="top"
            visible={topSentinelInView}
            dimensions="h-120 -mb-120"
          />

          {/* Content */}
          <div className="flex-grow flex flex-col pt-15 pb-40 md:pt-40 xl:py-60 3xl:pt-90">
            {/* Text */}
            <div
              className={[
                richtextStyles.root,
                "font-serif text-25 md:text-40 xl:text-50 2xl:text-75 leading-none",
                "3xl:w-4/5",
              ].join(" ")}
              dangerouslySetInnerHTML={{ __html: data.text }}
            />

            {/* Address */}
            <div
              className={[
                richtextStyles.root,
                "text-16 md:text-20 2xl:text-25 leading-tight uppercase mt-[1.25em] mb-90",
                "3xl:w-4/5",
              ].join(" ")}
              dangerouslySetInnerHTML={{ __html: data.address }}
            />

            {/* Links */}
            <ul className="mt-auto flex flex-wrap gap-10 2xl:gap-20 xl:w-2/3 3xl:w-7/12">
              {data.links.map((link) => (
                <li key={link.text}>
                  <Link href={link.href} passHref={true}>
                    <Button target={link.target ?? undefined} href={link.href}>
                      {link.text}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Imprint line */}
            <p
              className={[
                richtextStyles.root,
                "text-10 md:text-12 2xl:text-15 leading-snug uppercase mt-[1.66666em]",
              ].join(" ")}
            >
              <small dangerouslySetInnerHTML={{ __html: data.imprintLine }} />
            </p>

            {/* Signet */}
            <div className="relative hidden xl:block">
              <div className="absolute right-0 bottom-0">
                <img
                  className="max-w-full w-[150px] md:w-[260px] 2xl:w-[390px]"
                  src="/images/limonate-signet.svg"
                  alt="Limonate"
                />
              </div>
            </div>
          </div>

          {/* Scroll gradient & sentinel */}
          <Gradient
            position="bottom"
            visible={bottomSentinelInView}
            dimensions="h-120 -mt-120"
          />
          <Sentinel position="bottom" ref={bottomSentinelRef} />
        </Container>
      </div>
    </section>
  );
};

export default Info;
