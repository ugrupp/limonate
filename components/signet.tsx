import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import scrollsnapStyles from "../styles/scrollsnap.module.css";

interface SignetProps {}

const Signet: React.FC<SignetProps> = () => {
  // Play video when it's been scroll to
  const { ref: sectionRef, inView: sectionInView } = useInView({
    rootMargin: "-49%",
  });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (sectionInView) {
      videoRef.current?.play();
    }
  }, [sectionInView]);

  return (
    <section className={scrollsnapStyles.section} ref={sectionRef}>
      <div className="flex items-center justify-center h-screen xl:h-full">
        <video
          className="w-[150px] md:w-[275px] 3xl:w-[390px]"
          poster="/images/limonate-signet.svg"
          loop
          ref={videoRef}
        >
          <source src="/videos/limonate-animation.mp4" />
        </video>
      </div>
    </section>
  );
};

export default Signet;
