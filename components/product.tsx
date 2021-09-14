import classNames from "classnames";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Client from "shopify-buy";
import data from "../data/shop.json";
import useCart from "../lib/cart";
import { formatCurrency, formatUnitPrice } from "../lib/helpers";
import richtextStyles from "../styles/richtext.module.css";
import scrollsnapStyles from "../styles/scrollsnap.module.css";
import Container from "./container";
import ProductSwiper from "./product-swiper";
import { Gradient, Sentinel } from "./scroll-gradient";

interface ProductProps {
  product: Client.Product;
  first: boolean;
  last: boolean;
  data: typeof data;
}

const Product: React.FC<ProductProps> = ({ product, first, last, data }) => {
  // Product info extensions & overrides
  const productExtension = data.products.find(({ id }) => id === product.id);

  // Description scroll
  const intersectionRoot = useRef<HTMLDivElement>(null);
  const { ref: topSentinelRef, inView: topSentinelInView } = useInView({
    root: intersectionRoot.current,
  });
  const { ref: bottomSentinelRef, inView: bottomSentinelInView } = useInView({
    root: intersectionRoot.current,
  });

  // Checkout logic
  const [selectedVariant, setSelectedVariant] = useState<string | number>(
    product?.variants?.[0]?.id ?? ""
  );
  const [cart, checkout] = useCart();
  const handleBuyButtonClick = async () => {
    await checkout.addItem({
      variantId: selectedVariant,
      quantity: 1,
    });
  };

  return (
    <section
      className={classNames([
        scrollsnapStyles.section,
        "grid xl:grid-cols-2 gap-y-15 md:gap-y-40 gap-x-40 2xl:gap-x-60",
        {
          "mb-90 md:mb-180 xl:mb-0": !last,
          "mb-120 md:mb-240 xl:mb-0": last,
        },
      ])}
      id={first ? "shop" : undefined}
    >
      {/* Image slider */}
      <div className="min-h-screen h-full w-full relative overflow-x-hidden">
        <ProductSwiper
          images={product.images}
          focuspoint={productExtension?.focuspoint}
          productTitle={product.title}
        />
      </div>

      {/* Content */}
      <Container className="h-full xl:!pl-0" classNameInner="h-full">
        <div className="h-full flex flex-col gap-y-20 md:gap-y-90 xl:gap-y-60 justify-between xl:pt-60 xl:pb-40 2xl:pt-90 2xl:pb-60">
          {/* Text */}
          <div
            className="h-[154px] md:h-auto overflow-y-auto md:overflow-y-visible xl:flex-grow xl:overflow-y-auto xl:flex-basis-0"
            ref={intersectionRoot}
          >
            <div className="relative">
              {/* Scroll gradient & sentinel */}
              <Sentinel position="top" ref={topSentinelRef} />
              <Gradient
                position="top"
                visible={topSentinelInView}
                mobileHidden={false}
                dimensions="h-60 -mb-60 2xl:h-90 2xl:-mb-90"
              />
              <div
                className={[
                  richtextStyles.root,
                  "font-serif text-25 md:text-40 xl:text-35 2xl:text-55 leading-none",
                ].join(" ")}
                dangerouslySetInnerHTML={{
                  // @ts-ignore
                  __html: product.descriptionHtml,
                }}
              />

              {/* Scroll gradient & sentinel */}
              <Gradient
                position="bottom"
                visible={bottomSentinelInView}
                mobileHidden={false}
                dimensions="h-60 -mt-60 2xl:h-90 2xl:-mt-90"
              />
              <Sentinel position="bottom" ref={bottomSentinelRef} />
            </div>
          </div>

          {/* Bottom */}
          <div>
            {/* Actions */}
            <div>
              {/* Variant selection */}
              <select onChange={(e) => setSelectedVariant(e.target.value)}>
                {product.variants.map(
                  ({
                    id,
                    title: variantTitle,
                    priceV2,
                    unitPrice: variantUnitPrice,
                    unitPriceMeasurement,
                  }) => {
                    const title =
                      product.variants.length > 1
                        ? variantTitle
                        : product.title;

                    const price = formatCurrency(
                      priceV2.amount,
                      priceV2.currencyCode
                    );

                    let unitPrice = formatUnitPrice(
                      variantUnitPrice,
                      unitPriceMeasurement
                    );
                    unitPrice = unitPrice ? ` (${unitPrice})` : "";

                    return (
                      <option key={id} value={id}>
                        {title} • {price}
                        {unitPrice}
                      </option>
                    );
                  }
                )}
              </select>

              {/* Buy button */}
              <button onClick={handleBuyButtonClick} disabled={!cart}>
                Kaufen
              </button>
            </div>

            {/* Disclaimer text */}
            {data.disclaimerText && (
              <p className="mt-12 md:mt-20 2xl:mt-30 text-10 md:text-12 2xl:text-15 leading-snug uppercase">
                <small>{data.disclaimerText}</small>
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Product;
