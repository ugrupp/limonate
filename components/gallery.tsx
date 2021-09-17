import Image from "next/image";
import React, { useEffect, useState } from "react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import data from "../data/index.json";
import scrollsnapStyles from "../styles/scrollsnap.module.css";

interface GalleryProps {
  gallery: typeof data.gallery;
}

const Gallery: React.FC<GalleryProps> = ({ gallery }) => {
  const [swiper, setSwiper] = React.useState<SwiperCore>();
  const prevEl = React.useRef<HTMLButtonElement>(null);
  const nextEl = React.useRef<HTMLButtonElement>(null);
  const [prevImage, setPrevImage] = useState<string>();
  const [nextImage, setNextImage] = useState<string>();

  useEffect(() => {
    if (swiper && prevEl.current && nextEl.current && swiper && swiper.params) {
      swiper.params.navigation = {
        ...(swiper.params.navigation as object),
        prevEl: prevEl.current,
        nextEl: nextEl.current,
      };
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [prevEl.current, nextEl.current, swiper]);

  // Set preview cursor
  const updateNavImages = (swiper: SwiperCore) => {
    const nextSlide = swiper.slides[swiper.activeIndex + 1];
    const prevSlide = swiper.slides[swiper.activeIndex - 1];
    setPrevImage((prevSlide as HTMLElement)?.dataset?.previewImage);
    setNextImage((nextSlide as HTMLElement)?.dataset?.previewImage);
  };

  return (
    <section
      className={`${scrollsnapStyles.section} h-screen relative`}
      id="was"
    >
      {/* Navigation */}
      <div className="hidden xl:flex absolute inset-0 z-10">
        <button
          ref={prevEl}
          className="w-1/3"
          style={{
            cursor: prevImage && `url('${prevImage}'), auto`,
          }}
        />
        <button
          ref={nextEl}
          className="w-2/3"
          style={{
            cursor: nextImage && `url('${nextImage}'), auto`,
          }}
        />
      </div>

      {/* Slider */}
      <Swiper
        loop={false}
        speed={1000}
        modules={[Navigation]}
        onAfterInit={(swiper) => {
          setSwiper(swiper);
          updateNavImages(swiper);
        }}
        onSlideChange={(swiper) => {
          updateNavImages(swiper);
        }}
        slidesPerView={1}
        className="h-full"
      >
        {gallery.map(({ image }) => (
          <SwiperSlide
            className="h-full"
            key={image.src}
            data-preview-image={image.previewSrc}
          >
            <div className="h-full w-full xl:w-1/2 relative">
              <Image
                quality={85}
                layout="fill"
                src={image.src}
                alt={image.alt}
                objectFit="cover"
                objectPosition={image.objectPosition}
                loading="lazy"
                lazyBoundary="0px 100% 0px 0px" // TODO: Not working...
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Gallery;
