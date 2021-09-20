import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { menuOpenState, scrollLockState } from "../lib/state";
import useBoop from "../lib/useBoop";
import Container from "./container";
import Dot from "./dot";
import Menu from "./menu";

interface OverlayMenuProps {}

const OverlayMenu: React.FC<OverlayMenuProps> = () => {
  const [open, setOpen] = useRecoilState(menuOpenState);

  const [
    menuOpenerBoopAnimation,
    menuOpenerBoopTransition,
    menuOpenerBoopTrigger,
  ] = useBoop({
    scale: 1.15,
  });

  const closeHandler = () => {
    setOpen(false);
  };

  const scrollLock = useRecoilValue(scrollLockState);

  return (
    <Transition
      as={Fragment}
      show={open}
      enter="transition duration-300 ease-out"
      enterFrom="transform opacity-0"
      enterTo="transform opacity-100"
      leave="transition duration-200 ease-out"
      leaveFrom="transform opacity-100"
      leaveTo="transform opacity-0"
    >
      <Dialog onClose={closeHandler} className="fixed z-40 inset-0">
        <Dialog.Overlay className="fixed inset-0 bg-light" />

        <div className="absolute inset-0" style={{ paddingRight: scrollLock }}>
          {/* Closer */}
          <Container>
            <div className="relative z-20">
              <div className="absolute top-15 right-0 md:top-20 2xl:top-30">
                <Dot
                  text="Menü schließen"
                  theme="dark"
                  onClick={closeHandler}
                  onMouseEnter={menuOpenerBoopTrigger}
                  animate={menuOpenerBoopAnimation}
                  transition={menuOpenerBoopTransition}
                />
              </div>
            </div>
          </Container>
        </div>

        <div className="absolute inset-0">
          {/* Menu */}
          <Menu />
        </div>
      </Dialog>
    </Transition>
  );
};

export default OverlayMenu;
