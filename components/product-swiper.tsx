import React from "react";
import Client from "shopify-buy";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

interface ProductSwiperProps {
  images: Client.Image[];
  productTitle: string;
  focuspoint?: string;
}

const ProductSwiper: React.FC<ProductSwiperProps> = ({
  images,
  productTitle,
  focuspoint,
}) => {
  return images.length === 1 ? (
    <Image
      quality={85}
      layout="fill"
      src={images[0].src}
      alt={images[0].altText ?? productTitle}
      objectFit="cover"
      objectPosition={focuspoint}
    />
  ) : (
    <Swiper
      modules={[Autoplay]}
      loop={true}
      speed={1000}
      autoplay={{
        delay: 3500,
        pauseOnMouseEnter: false,
      }}
      lazy={{
        checkInView: true,
        loadPrevNext: true,
        loadPrevNextAmount: 2,
      }}
      slidesPerView={1}
      className="h-full"
      grabCursor={true}
    >
      {images.map((image) => (
        <SwiperSlide className="h-full" key={image.src}>
          <Image
            quality={85}
            layout="fill"
            src={image.src}
            alt={image.altText ?? productTitle}
            objectFit="cover"
            objectPosition={focuspoint}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductSwiper;
