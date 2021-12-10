import classNames from "classnames";
import React, { ReactNode, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSetRecoilState } from "recoil";
import Container from "../components/container";
import { pageScrolledState } from "../lib/state";
import Button from "./button";
import { Gradient, Sentinel } from "./scroll-gradient";

interface PageProps {
  col1Content: ReactNode;
  col2Content: ReactNode;
  pageScroll?: boolean;
}

const Page: React.FC<PageProps> = ({
  col1Content,
  col2Content,
  pageScroll = true,
}) => {
  // Set up sentinels
  const {
    ref: mobileTopSentinelRef,
    inView: mobileTopSentinelInView,
    entry: mobileTopSentinelEntry,
  } = useInView();
  const { ref: mobileBottomSentinelRef, inView: mobileBottomSentinelInView } =
    useInView();
  const { ref: col1TopSentinelRef, inView: col1TopSentinelInView } =
    useInView();
  const { ref: col1BottomSentinelRef, inView: col1BottomSentinelInView } =
    useInView();
  const { ref: col2TopSentinelRef, inView: col2TopSentinelInView } =
    useInView();
  const { ref: col2BottomSentinelRef, inView: col2BottomSentinelInView } =
    useInView();

  // Set scroll state to show topbar
  const setPageScrolledState = useSetRecoilState(pageScrolledState);
  useEffect(() => {
    if (mobileTopSentinelEntry) {
      setPageScrolledState(!mobileTopSentinelInView);
    }
  }, [mobileTopSentinelInView, mobileTopSentinelEntry]);

  return (
    <div className="relative">
      {/* Scroll gradient & sentinel (mobile) */}
      <Sentinel
        position="top"
        ref={mobileTopSentinelRef}
        classes="xl:!hidden"
      />
      <Gradient
        position="top"
        visible={mobileTopSentinelInView}
        mobileHidden={false}
        classes="xl:!hidden"
        dimensions="h-60 -mb-60 md:h-90 md:-mb-90"
      />

      <Container classNameInner="!max-w-none">
        <div
          className={classNames([
            "grid xl:grid-cols-2 gap-y-60 md:gap-y-90 gap-x-40 2xl:gap-x-60",
            {
              "pt-15 md:pt-40 xl:pt-60 2xl:pt-90 xl:h-screen": true,
            },
          ])}
        >
          {[
            {
              colIndex: 1,
              content: col1Content,
              topSentinelRef: col1TopSentinelRef,
              topSentinelInView: col1TopSentinelInView,
              bottomSentinelRef: col1BottomSentinelRef,
              bottomSentinelInView: col1BottomSentinelInView,
            },
            {
              colIndex: 2,
              content: col2Content,
              topSentinelRef: col2TopSentinelRef,
              topSentinelInView: col2TopSentinelInView,
              bottomSentinelRef: col2BottomSentinelRef,
              bottomSentinelInView: col2BottomSentinelInView,
            },
          ].map(
            ({
              content,
              colIndex,
              topSentinelInView,
              topSentinelRef,
              bottomSentinelInView,
              bottomSentinelRef,
            }) => (
              <div
                key={colIndex}
                className={pageScroll ? "" : "xl:h-full xl:overflow-y-auto"}
              >
                <div className="relative">
                  {/* Scroll gradient & sentinel (desktop) */}
                  <Sentinel position="top" ref={topSentinelRef} />
                  <Gradient
                    position="top"
                    visible={topSentinelInView}
                    mobileHidden={true}
                    dimensions="xl:h-90 xl:-mb-90"
                  />

                  {/* Content */}
                  <div className="pt-4 pb-15 md:pb-40 xl:pb-60 2xl:pb-90">
                    {content}

                    {/* Mobile back button */}
                    {colIndex === 2 && (
                      <div className="mt-60 xl:hidden">
                        <Button href="/#info">Zurück</Button>
                      </div>
                    )}
                  </div>

                  {/* Scroll gradient & sentinel (desktop) */}
                  <Gradient
                    position="bottom"
                    visible={bottomSentinelInView}
                    mobileHidden={true}
                    dimensions="xl:h-90 xl:-mt-90"
                  />
                  <Sentinel position="bottom" ref={bottomSentinelRef} />
                </div>
              </div>
            )
          )}
        </div>
      </Container>

      {/* Scroll gradient & sentinel (mobile) */}
      <Gradient
        position="bottom"
        visible={mobileBottomSentinelInView}
        mobileHidden={false}
        classes="xl:!hidden"
        dimensions="h-60 -mt-60 md:h-90 md:-mt-90"
      />
      <Sentinel
        position="bottom"
        ref={mobileBottomSentinelRef}
        classes="xl:!hidden"
      />
    </div>
  );
};

export default Page;
