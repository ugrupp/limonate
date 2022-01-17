import { Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  cartOpenState,
  menuOpenState,
  pageScrolledState,
  scrollLockState,
} from "../lib/state";
import useBoop from "../lib/useBoop";
import useCart from "../lib/useCart";
import Container from "./container";
import Dot from "./dot";

interface TopbarProps {}

const Topbar: React.FC<TopbarProps> = () => {
  const pageScrolled = useRecoilValue(pageScrolledState);

  // Cart
  const [cart] = useCart();
  const setCartOpen = useSetRecoilState(cartOpenState);

  const openCartButtonHandler = () => {
    setCartOpen(true);
  };

  const totalItemsCount = cart?.lineItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Menu opener
  const [
    menuOpenerBoopAnimation,
    menuOpenerBoopTransition,
    menuOpenerBoopTrigger,
  ] = useBoop({
    scale: 1.15,
  });
  const setMenuOpen = useSetRecoilState(menuOpenState);

  const menuOpenerButtonHandler = () => {
    setMenuOpen(true);
  };

  const scrollLock = useRecoilValue(scrollLockState);

  return (
    <Transition
      show={pageScrolled}
      as={Fragment}
      enter="transition duration-200 ease-out"
      enterFrom="transform opacity-0"
      enterTo="transform opacity-100"
      leave="transition duration-200 ease-out"
      leaveFrom="transform opacity-100"
      leaveTo="transform opacity-0"
    >
      <header className="fixed top-0 inset-x-0 z-30 px-15 md:px-20 2xl:px-30">
        {/* Mobile Bg */}
        <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-light via-light xl:bg-none h-60"></div>

        {/* Content */}
        <div className="relative">
          <div
            className="absolute top-0 right-0 py-15 md:py-20 2xl:py-30 flex justify-end gap-x-15 md:gap-x-20 2xl:gap-x-30"
            style={{ paddingRight: scrollLock }}
          >
            {/* Cart */}
            {!!totalItemsCount && (
              <button
                onClick={openCartButtonHandler}
                className="text-16 md:text-20 2xl:text-25 leading-tight uppercase md:translate-y-[0.05em] 2xl:translate-y-[0.14em] focus:outline-none focus-visible:outline-black"
              >
                Warenkorb ({totalItemsCount})
              </button>
            )}

            {/* Menu toggler */}
            <Dot
              text="Menü öffnen"
              theme="dark"
              onClick={menuOpenerButtonHandler}
              onMouseEnter={menuOpenerBoopTrigger}
              animate={menuOpenerBoopAnimation}
              transition={menuOpenerBoopTransition}
            />
          </div>
        </div>
      </header>
    </Transition>
  );
};

export default Topbar;
