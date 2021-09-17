import React, { useRef } from "react";
import { useInView } from "react-intersection-observer";
import shopData from "../data/shop.json";
import useCart from "../lib/cart";
import { formatCurrency } from "../lib/helpers";
import cartStyles from "../styles/cart.module.css";
import Button from "./button";
import CartItem from "./cart-item";
import Overlay from "./overlay";
import { Gradient, Sentinel } from "./scroll-gradient";

interface CartProps {}

const Cart: React.FC<CartProps> = () => {
  const [cart] = useCart();

  // Scroll
  const intersectionRoot = useRef<HTMLDivElement>(null);
  const { ref: topSentinelRef, inView: topSentinelInView } = useInView({
    root: intersectionRoot.current,
  });
  const { ref: bottomSentinelRef, inView: bottomSentinelInView } = useInView({
    root: intersectionRoot.current,
  });

  // Cart state is mandatory
  if (!cart) {
    return null;
  }

  const subtotalPrice = formatCurrency(
    cart.subtotalPriceV2.amount,
    cart.subtotalPriceV2.currencyCode
  );

  return (
    <Overlay>
      <div className="overflow-auto h-full">
        <div className="relative min-h-full flex flex-col">
          {/* Scroll gradient & sentinel */}
          <Sentinel position="top" ref={topSentinelRef} />
          <Gradient
            position="top"
            visible={topSentinelInView}
            mobileHidden={false}
            dimensions="h-40 -mb-40 md:h-60 md:-mb-60 2xl:h-90 2xl:-mb-90"
            color="dark"
            classes="rounded-t-[15px]"
          />
          <div className="p-15 md:p-40 2xl:p-60 flex flex-col gap-y-50 md:gap-y-80 xl:gap-y-90 2xl:gap-y-120 flex-grow relative z-0">
            <div className="text-23 md:text-35 2xl:text-50 leading-none uppercase">
              {/* Product list head */}
              <div className="hidden md:block md:mb-40 2xl:mb-60">
                <div className={cartStyles.root}>
                  <h4 className="hidden md:block">Produkt</h4>
                  <h4 className="hidden xl:block xl:text-center">Menge</h4>
                  <h4 className="hidden xl:block text-right">Preis</h4>
                </div>
              </div>

              {/* Product list */}
              <ul className="space-y-50 md:space-y-80 xl:space-y-90 2xl:space-y-120">
                {cart.lineItems.map((lineItem) => {
                  return (
                    <li key={lineItem.id}>
                      <CartItem item={lineItem} />
                    </li>
                  );
                })}
              </ul>

              {/* Total price */}
              {!!subtotalPrice && (
                <div className="mt-50 md:mt-80 xl:mt-90 2xl:mt-120 text-right">
                  <p>
                    <strong>Gesamt {subtotalPrice}</strong>
                  </p>

                  <p className="mt-10 md:mt-16 xl:mt-10 2xl:mt-24 text-10 md:text-12 xl:text-20 2xl:text-25">
                    zzgl. Versand
                  </p>
                </div>
              )}
            </div>

            {/* Bottom actions */}
            <div className="mt-auto flex flex-col gap-y-12 gap-x-20 md:flex-row items-start md:items-end">
              {/* Pay button */}
              <Button
                target="_blank"
                href={cart.webUrl}
                className="md:order-2 md:ml-auto"
                theme="light"
              >
                Bezahlen
              </Button>

              {/* Disclaimer text */}
              {shopData.disclaimerText && (
                <p className="text-10 md:text-12 2xl:text-15 leading-snug uppercase">
                  <small>{shopData.disclaimerText}</small>
                </p>
              )}
            </div>
          </div>

          {/* Scroll gradient & sentinel */}
          {/* TODO: positioning */}
          <Gradient
            position="bottom"
            visible={bottomSentinelInView}
            mobileHidden={false}
            dimensions="h-40 -mt-40 md:h-60 md:-mt-60 2xl:h-90 2xl:-mt-90"
            color="dark"
            classes="rounded-b-[15px]"
          />
          <Sentinel position="bottom" ref={bottomSentinelRef} />
        </div>
      </div>
    </Overlay>
  );
};

export default Cart;
