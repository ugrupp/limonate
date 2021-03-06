import React, { useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useRecoilState } from "recoil";
import shopData from "../data/shop.json";
import { cartOpenState } from "../lib/state";
import useCart from "../lib/useCart";
import { formatCurrency } from "../lib/util";
import cartStyles from "../styles/cart.module.css";
import { ButtonFwdRef } from "./button";
import CartItem from "./cart-item";
import Overlay from "./overlay";
import { Gradient, Sentinel } from "./scroll-gradient";

interface CartProps {}

const Cart: React.FC<CartProps> = () => {
  const [cart] = useCart();
  const [isOpen, setIsOpen] = useRecoilState(cartOpenState);

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
    <Overlay isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="h-full px-2 py-10">
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
            <div className="px-15 pb-15 pt-30 md:p-40 xl:pr-60 2xl:p-60 2xl:pr-90 flex flex-col gap-y-50 md:gap-y-80 xl:gap-y-90 2xl:gap-y-120 flex-grow relative z-0">
              <div className="text-23 md:text-35 2xl:text-50 leading-none uppercase">
                {/* Product list head */}
                <div className="hidden md:block md:mb-40 2xl:mb-60">
                  <div className={cartStyles.root}>
                    <h4 className="hidden md:block translate-y-[0.14em]">
                      Produkt
                    </h4>
                    <h4 className="hidden xl:block xl:text-center translate-y-[0.14em]">
                      Menge
                    </h4>
                    <h4 className="hidden xl:block text-right translate-y-[0.14em]">
                      Preis
                    </h4>
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
                <ButtonFwdRef
                  target="_blank"
                  href={cart.webUrl}
                  className="md:order-2 md:ml-auto"
                  theme="light"
                >
                  Bezahlen
                </ButtonFwdRef>

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
      </div>
    </Overlay>
  );
};

export default Cart;
