import { Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useInView } from "react-intersection-observer";
import { useSetRecoilState } from "recoil";
import { cartOpenState, menuOpenState } from "../lib/state";
import useBoop from "../lib/useBoop";
import useCart from "../lib/useCart";
import Container from "./container";
import Dot from "./dot";

interface TopbarProps {}

const Topbar: React.FC<TopbarProps> = () => {
  // TODO: not working on desktop. => Move into global state & move senintel into scrollsnap wrapper, passing down the ref (right?)
  const { ref: topSentinelRef, inView: topSentinelInView } = useInView();

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

  return (
    <>
      {/* Top sentinel to check if page is scrolled */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        ref={topSentinelRef}
      ></div>

      <Transition show={!topSentinelInView} as={Fragment}>
        <header className="fixed top-0 inset-x-0 z-30">
          <Container>
            <div className="relative">
              <div className="absolute right-0 top-0 py-15 md:py-20 2xl:py-30 flex justify-end items-center gap-x-15 md:gap-x-20 2xl:gap-x-30">
                {/* Cart */}
                {totalItemsCount && (
                  <button
                    onClick={openCartButtonHandler}
                    className="text-16 md:text-20 2xl:text-25 leading-tight uppercase translate-y-[0.14em] focus:outline-none focus-visible:outline-black"
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
          </Container>
        </header>
      </Transition>
    </>
  );
};

export default Topbar;
